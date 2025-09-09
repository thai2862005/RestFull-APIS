import { Request, Response } from 'express';
import { getUserByIdApi } from '../service/api.service';

const getUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const user = await getUserByIdApi(userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
export { getUserById };