import { Request, Response } from 'express';
import Phone from '../../models/phones';

const phone = new Phone();

export const createPhone = async (req: Request, res: Response) => {
  try {
    const response = await phone.createPhone(req.body);
    res.status(201).json({
      status: true,
      data: response,
      message: 'Phone created successfully.'
    });
  } catch (error) {
    res.status(400).json({
      error: (error as Error).message
    });
  }
};
