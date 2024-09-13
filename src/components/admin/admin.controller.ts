import { NextFunction, Request, Response } from 'express';
import { badImplementationException, invalidException } from '../../utils/apiErrorHandler';
import { encodeJwt } from '../../utils/jwt';

import * as service from './admin.service';
import { CustomRequest } from '../../@types/coustomRequest';




export const editRole = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const user = req.user
    const { id, newRole } = req.body;
    if(newRole==="Member" && user?.userType !=="superAdmin" ) throw invalidException('Admin Must be a Super Admin to edit the Admin')
    await service.editRole(id, newRole);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getAllUsers = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let users = await  service.listAllUsers();
    console.log(users);
    
    return res.status(200).json({ success: true ,users});
  } catch (err) {
    console.error(err);
    next(err);
  }
};