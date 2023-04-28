import { Request, Response } from 'express';
import Parcel from '../../models/parcel';

const parcel = new Parcel();

export const getParcel = async (req: Request, res: Response) => {
  try {
    const response = await parcel.getUserParcels(req.params.id);
    res.status(200).json({
      data: response,
      message: 'Parcel fetched successfully.'
    });
  } catch (error) {
    res.status(500).json({
      error: (error as Error).message
    });
  }
};
