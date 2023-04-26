import { Request, Response } from 'express';
import User from '../../models/user';

const user = new User();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const response = await user.getUsers();
    res.status(200).json({
      data: response,
      message: 'Users fetched successfully.'
    });
  } catch (error) {
    res.status(500).json({
      error: (error as Error).message
    });
  }
};
