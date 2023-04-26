import { Request as ExpressRequest, Response } from 'express';
import User from '../../models/user';
import { DecodedToken } from '../../utils/token';

interface Request extends ExpressRequest {
  user?: DecodedToken;
}

const user = new User();

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.user?.id;
  try {
    if (Number(req.params.id) !== id) {
      throw new Error('User ID does not match the token id');
    }
    const response = await user.deleteUser(req.params.id);
    res.status(200).json({
      status: true,
      data: response,
      message: 'User deleted successfully.'
    });
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message
    });
  }
};
