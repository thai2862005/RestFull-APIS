import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const CheckJwt = (req: Request, res: Response, next: NextFunction) => {
  const path = req.path;
  const Whitelist = ['/login'];
  const isWhiteList = Whitelist.some((item) => item === path);
  if (isWhiteList) {
    next();
    return;
  }


  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY);
    (req as any).user = decoded;
    console.log("decoded", decoded);
    (req as any).user = {
      id: decoded.id,
      fullname: decoded.fullname,
      username: decoded.username,
      password: decoded.password,
      roleId: decoded.roleId,
      role: decoded.role, 
    };

    next();
  } catch (error) {
    return res.status(401).json({ 
      data: null,
      message: 'Token không hợp lệ ( Cần truyền lên Token)' });
  }
};

export { CheckJwt };
