import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const CheckJwt = (req: Request, res: Response, next: NextFunction) => {
  const path = req.path;
  const Whitelist = ['/login'];
  const isWhiteList = Whitelist.some((item) => path.startsWith(item));

  if (isWhiteList) {
    return next();
  }

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY) as any;

    (req as any).user = {
      id: decoded.id,
      fullname: decoded.fullname,
      username: decoded.username,
      roleId: decoded.roleId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      data: null,
      message: 'Token không hợp lệ (Cần truyền lên Token)',
    });
  }
};

export { CheckJwt };
