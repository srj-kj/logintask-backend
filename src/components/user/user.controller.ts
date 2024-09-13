import { NextFunction, Request, Response } from 'express';
import {
  badImplementationException,
  dataNotExistException,
  unauthorizedException,
} from '../../utils/apiErrorHandler';
import { getUserByEmail, getUserByID } from '../../models/user';
import { decodeJwt, encodeJwt } from '../../utils/jwt';
import * as service from './user.service';
import { NewUserDocument } from '../../models/@types';
import { CustomRequest } from '../../@types/coustomRequest';
import { comparePassword } from '../../utils/bcrypt';


export const login = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
   
    console.log(req.body);
    const { email, password } = req.body;
    const data= await getUserByEmail(email);
    if (!data) return res.status(401).json('Email or Password Incorrect');
    const isMatch = await comparePassword(password, data.password);
    if (!isMatch)  return res.status(401).json('Email or Password Incorrect');
       
     req.user = data;
     const { ACCESS_TOKEN_EXPIRED_IN } = process.env;

     const accessToken = encodeJwt(
       { id: data._id },
       ACCESS_TOKEN_EXPIRED_IN || '1D',
       'access'
     );

    return res.status(200).json({ success: true,accessToken, user:data.userType});
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password,name } = req.body;
    console.log(req.body);
    
    const newUser: NewUserDocument = {
      userType: 'Member',
      email: email,
      name:name,
      password: password,
    };
    await service.createUser(newUser);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
export const profile = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json('user not found');
    const data = await getUserByID(user._id as string);
    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error(err);
    next(err);
  }
};




