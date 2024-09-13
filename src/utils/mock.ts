import mongoose from "mongoose";
import dotenv from 'dotenv';
import { Users } from "../models/user/user.entity";
dotenv.config();
 const mongoUri = process.env.MONGOLAB_URI as string;

const createSuperAdmin = async () => {
  try {
    
    if (mongoose.connection.readyState !== mongoose.ConnectionStates.connected) {
      await mongoose.connect(mongoUri);
    }

    const superAdminData = {
      name: process.env.SUPER_ADMIN_NAME,
      email: process.env.SUPER_ADMIN_EMAIL ,
      password: process.env.SUPER_ADMIN_PASSWORD , 
      userType: 'superAdmin',
    };

    
    const result = await Users.create(superAdminData);
    console.log('Super Admin created:', result);
  } catch (err) {
    console.error('Error creating Super Admin:', err);
  } finally {
    mongoose.connection.close();
  }
};

createSuperAdmin();
