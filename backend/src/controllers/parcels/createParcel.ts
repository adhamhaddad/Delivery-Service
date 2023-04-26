import { Request as ExpressRequest, Response } from 'express';
import Parcel from '../../models/parcel';
import { io } from '../../server';
import { DecodedToken } from '../../utils/token';

interface Request extends ExpressRequest {
  user?: DecodedToken;
}

const parcel = new Parcel();

export const createParcel = async (req: Request, res: Response) => {
  const id = req.user?.id;
  try {
    if (id !== req.body.sender_id) {
      throw new Error('User ID does not match the token id');
    }
    const response = await parcel.createParcel(req.body);
    io.emit('parcels', { type: 'CREATE', data: response });
    res.status(201).json({
      data: response,
      message: 'Parcel created successfully.'
    });
  } catch (error) {
    res.status(500).json({
      error: (error as Error).message
    });
  }
};
