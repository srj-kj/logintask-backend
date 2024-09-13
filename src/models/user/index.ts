import { ClientSession } from 'mongoose';
import {  NewUserDocument, UpdateUserDocument } from '../@types';
import { Users } from './user.entity';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await Users.findOne({ email });
    return Promise.resolve(user);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const getUsers = async () => {
  try {
    const users = await Users.find({}, '-password');
    return Promise.resolve(users);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getUserByID = async (userId: string) => {
  try {
    const user = await Users.findById(userId,'-password');
    console.log(user);
    
    return Promise.resolve(user);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const addUser = async (user: NewUserDocument) => {
  try {
    const newUser = new Users(user);
    await newUser.save();  
    return Promise.resolve();
  } catch (err) {
    console.error(err);  
    return Promise.reject(err instanceof Error ? err : new Error('An error occurred'));
  }
};
;


export const updateUserFields = async (
  userId: string,
  data: UpdateUserDocument
) => {
  try {
     await Users.findOneAndUpdate({ _id: userId }, { $set: data }, { new: true })
     return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};
