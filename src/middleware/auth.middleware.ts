import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helper/jwt.helper';

export async function Auth(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.headers.authorization.replace('Bearer ', '');
  try {
    let user: any = await verifyToken(accessToken, process.env.TOKEN_SECRET);
    req['userId'] = user.data.id;
    req['token'] = accessToken;
    next();
  } catch (error) {
    res.status(401).json({ message: 'token expired' });
  }
}
