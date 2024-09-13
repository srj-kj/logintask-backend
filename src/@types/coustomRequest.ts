import { Document } from "mongoose";
import { Request } from "express";
import { UserDocument } from "../models/@types";

export interface CustomRequest extends Request {
   user?: UserDocument | null;
    
  }