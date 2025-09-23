import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const CheckJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY as any);

    (req as any).user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      password: decoded.password,
      roleId: decoded.roleId,
    };

    next();
  } catch (error) {
    return res.status(401).json({ 
      data: null,
      message: 'Token không hợp lệ ( Cần truyền lên Token)' });
  }
};

export { CheckJwt };
