import { Request as ExpressRequest, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { redisClient } from '../../database';
import { DecodedToken } from '.';
import { verifyRefreshToken, setAccessToken } from '.';
import configs from '../../configs';

const publicAccessKey = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'keys',
  'accessToken',
  'public.key'
);
interface Request extends ExpressRequest {
  user?: DecodedToken;
}

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization as string;
    if (!authorization) {
      return res.status(401).json({
        message: 'Not Authorized'
      });
    }
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new Error(
        'Invalid Authorization header format. Format is "Bearer <token>".'
      );
    }
    try {
      const publicKey = await fs.promises.readFile(publicAccessKey, 'utf8');
      const decoded = jwt.verify(token, publicKey, {
        algorithms: ['RS256'],
        issuer: 'Nodejs-Refresh-Token'
      }) as DecodedToken;
      const cachedToken = await redisClient.get(`access_token:${decoded.id}`);
      if (!cachedToken || cachedToken !== token) {
        throw new Error('Access token not found or expired');
      }
      req.user = { id: decoded.id, role: decoded.role };
      return next();
    } catch (err) {
      const authorization = req.headers.authorization as string;

      if ((err as Error).name !== 'TokenExpiredError') {
        throw new Error('Invalid access token');
      }

      // Get Refresh-Token
      const refreshToken = req.get('X-Refresh-Token') as string;

      // Rest of your route code goes here
      if (!refreshToken) {
        throw new Error('Refresh token missing');
      }

      const [bearer, token] = refreshToken.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new Error(
          'Invalid Authorization header format. Format is "Bearer <token>".'
        );
      }

      const decoded = await verifyRefreshToken(token);
      const { id, first_name, last_name, username, role } = decoded;
      const accessToken = await setAccessToken({
        id,
        first_name,
        last_name,
        username,
        role
      });

      // Attach user object to request and proceed with new access token
      req.user = { id: decoded.id, role: decoded.role };
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        sameSite: 'strict',
        domain: 'localhost',
        secure: false,
        maxAge: configs.access_expires
      });
      return next();
    }
  } catch (err) {
    res.status(401).json({ message: (err as Error).message });
  }
};
