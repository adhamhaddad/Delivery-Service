import { Request as ExpressRequest, Response } from 'express';
import Order from '../../models/order';
import { io } from '../../server';
import { DecodedToken } from '../../utils/token';

interface Request extends ExpressRequest {
  user?: DecodedToken;
}

const order = new Order();
export const createOrder = async (req: Request, res: Response) => {
  const id = req.user?.id;
  try {
    if (id !== req.body.biker_id) {
      throw new Error('User ID does not match the token id');
    }
    const response = await order.createOrder(req.body);
    io.emit('orders', { type: 'CREATE', data: response });
    res.status(201).json({
      data: response,
      message: 'Order created successfully.'
    });
  } catch (error) {
    res.status(500).json({
      error: (error as Error).message
    });
  }
};
