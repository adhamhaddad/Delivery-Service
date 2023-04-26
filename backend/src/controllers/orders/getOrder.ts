import { Request, Response } from 'express';
import Order from '../../models/order';

const order = new Order();

export const getOrder = async (req: Request, res: Response) => {
  try {
    const response = await order.getOrder(req.params.id);
    res.status(200).json({
      data: response,
      message: 'Order fetched successfully.'
    });
  } catch (error) {
    res.status(500).json({
      error: (error as Error).message
    });
  }
};
