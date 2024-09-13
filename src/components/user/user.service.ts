import { NewUserDocument } from "../../models/@types";
import { addUser, getUserByEmail, updateUserFields } from "../../models/user";
import { Users } from "../../models/user/user.entity";
import { badImplementationException, HttpException } from "../../utils/apiErrorHandler";
import { comparePassword } from "../../utils/bcrypt";




export const createUser = async (newUser: NewUserDocument) => {
  try {
    
    const data = await addUser(newUser);
    return data;  
  } catch (err) {
    
    console.error(err);
    return Promise.reject(err instanceof Error ? err : new Error('An error occurred'));
  }
};
