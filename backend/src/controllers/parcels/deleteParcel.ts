import { Request, Response } from 'express';
import Parcel from '../../models/parcel';
import { io } from '../../server';

const parcel = new Parcel();

export const deleteParcel = async (req: Request, res: Response) => {
  try {
    const response = await parcel.deleteParcel(req.params.id);
    io.emit('parcels', { type: 'DELETE', data: response });
    res.status(200).json({
      data: response,
      message: 'Parcel deleted successfully.'
    });
  } catch (error) {
    res.status(500).json({
      error: (error as Error).message
    });
  }
};
