import { Request as ExpressRequest, Response } from 'express';
import Order from '../../models/order';
import { io } from '../../server';
import { DecodedToken } from '../../utils/token';

interface Request extends ExpressRequest {
  user?: DecodedToken;
}

const order = new Order();

export const updateOrder = async (req: Request, res: Response) => {
  const id = req.user?.id;
  try {
    if (req.body.biker_id !== id) {
      throw new Error('User ID does not match the token id');
    }
    const response = await order.updateOrder(req.params.id);
    io.emit('orders', { type: 'UPDATE', data: response });
    res.status(204).json({
      data: response,
      message: 'Order updated successfully.'
    });
  } catch (error) {
    res.status(500).json({
      error: (error as Error).message
    });
  }
};
