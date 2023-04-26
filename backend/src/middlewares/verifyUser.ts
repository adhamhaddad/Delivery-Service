import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { DecodedToken } from '../utils/token';

interface Request extends ExpressRequest {
  user?: DecodedToken;
}

const verifySender = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user?.id;
    const role = req.user?.role;
    console.log('ID', id, 'ROLE', role);

    if (role === 1) {
      next();
    } else {
      throw new Error('Only senders can access the parcels route');
    }
  } catch (error) {
    res.status(401).json({
      error: (error as Error).message
    });
  }
};

const verifyBiker = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.user?.id;
    const role = req.user?.role;
    console.log('ID', id, 'ROLE', role);

    if (role === 0) {
      next();
    } else {
      throw new Error('Only bikers can access the orders route');
    }
  } catch (error) {
    res.status(401).json({
      error: (error as Error).message
    });
  }
};

export { verifySender, verifyBiker };
