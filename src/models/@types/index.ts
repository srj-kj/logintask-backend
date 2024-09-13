import mongoose from 'mongoose';


export type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: boolean) => void) => void;

export type UserDocument = mongoose.Document &
  NewUserDocument & {
    comparePassword: comparePasswordFunction;
  };

export type NewUserDocument = {
  name: string;
  userType: 'Admin' | 'Member' | "superAdmin" ;
  email: string;
  password: string;
}

export type UpdateUserDocument = {
  userType?: 'Admin' | 'Member' | "superAdmin" ;
  email?: string;
  name?: string;
  password?: string;
};

