import { Request, Response } from 'express';
import Parcel from '../../models/parcel';

const parcel = new Parcel();

export const getParcels = async (req: Request, res: Response) => {
  try {
    const response = await parcel.getParcels();
    res.status(200).json({
      data: response,
      message: 'Parcels fetched successfully.'
    });
  } catch (error) {
    res.status(500).json({
      error: (error as Error).message
    });
  }
};
