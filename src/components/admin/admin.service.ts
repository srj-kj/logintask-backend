import { getUserByEmail, getUserByID, getUsers, updateUserFields } from "../../models/user";
import { badImplementationException, dataNotExistException, HttpException } from "../../utils/apiErrorHandler";


export const editRole = async (id: string,  userType: "Member" | "Admin") => {
    let error: Error | HttpException | undefined;
    try {
      const user = await getUserByID(id);
      if (!user) throw dataNotExistException('User does not exist');
      await updateUserFields(id, { userType });
      return Promise.resolve();
    } catch (err) {
      console.log(err);
      error = err instanceof Error ? err : badImplementationException(err);
      return Promise.reject(error);
    }
  };

  export const listAllUsers = async () => {
    let error: Error | HttpException | undefined;
    try {
      const users = await getUsers();
      if (!users) throw dataNotExistException('User does not exist');
      return Promise.resolve(users);
    } catch (err) {
      console.log(err);
      error = err instanceof Error ? err : badImplementationException(err);
      return Promise.reject(error);
    }
  };
