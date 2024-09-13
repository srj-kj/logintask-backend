import { Request, Response, NextFunction } from 'express';
import { unauthorizedException } from './apiErrorHandler';
import { getUserByID } from '../models/user';
import { decodeJwt } from './jwt';
import { CustomRequest } from '../@types/coustomRequest';

export const isAuthenticated = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    // console.log(req.headers)
    const bearer = req.headers['authorization'];
    if (!bearer) throw unauthorizedException('No token provided');

    const token = bearer.split(' ')[1];
    const decoded = decodeJwt(token, 'access');

    const user = await getUserByID(decoded.payload.id);
    if (!user) throw unauthorizedException('User is not exist');
  
    req.user = user;
    next();
  } catch (err) {
    console.warn(err);
    next(err);
  }
};




export const isAdmin = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const bearer = req.headers['authorization'];
    if (!bearer) throw unauthorizedException('No token provided');

    const token = bearer.split(' ')[1];
    const decoded = decodeJwt(token, 'access');

    const user = await getUserByID(decoded.payload.id);
    if (user?.userType === 'Member') throw unauthorizedException('Admin is not exist');

    req.user = user;
    next();
  } catch (err) {
    console.warn(err);
    next(err);
  }
};




