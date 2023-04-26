import { Request, Response } from 'express';
import Phone from '../../models/phones';

const phone = new Phone();

export const deletePhone = async (req: Request, res: Response) => {
  try {
    const response = await phone.deletePhone(req.params.id);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Phones deleted successfully.'
    });
  } catch (error) {
    res.status(400).json({
      error: (error as Error).message
    });
  }
};
