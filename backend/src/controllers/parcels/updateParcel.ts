import { Request, Response } from 'express';
import Parcel from '../../models/parcel';
import { io } from '../../server';

const parcel = new Parcel();

export const updateParcel = async (req: Request, res: Response) => {
  try {
    const response = await parcel.updateParcel(req.params.id, req.body);
    io.emit('parcels', { type: 'UPDATE', data: response });
    res.status(203).json({
      data: response,
      message: 'Parcel updated successfully.'
    });
  } catch (error) {
    res.status(500).json({
      error: (error as Error).message
    });
  }
};
