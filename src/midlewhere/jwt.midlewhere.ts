
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const CheckJwt =(req: Request, res: Response, next: NextFunction) => {
   const token = req.headers.authorization?.split('')[1];
   if(!token){
    return res.status(401).json({message: 'No token provided'});
   } 
   console.log(token);
   next();
}
export { CheckJwt }
