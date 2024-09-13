import jwt from 'jsonwebtoken';
import { badImplementationException, unauthorizedException } from './apiErrorHandler';


export const encodeJwt = (
  payload: string | Record<string, unknown> | Buffer,
  expiresIn: string | number,
  secret: 'refresh' | 'access' | 'default' = 'default',
) => {
  try {
    const SECRET =
      secret === 'refresh'
        ? process.env.JWT_REFRESH_SECRET
        : secret === 'access'
        ? process.env.JWT_ACCESS_SECRET
        : process.env.JWT_SECRET;
    if (!SECRET) throw badImplementationException('SECRET is not defined on env file');
    const jwtoken = jwt.sign({ payload }, SECRET, { expiresIn });
    return jwtoken;
  } catch (err: any) {
    console.error(err);
    throw err;
  }
};

export const decodeJwt = (jwtoken: string, secret: 'refresh' | 'access' | 'default' = 'default') => {
  try {
    const SECRET =
      secret === 'refresh'
        ? process.env.JWT_REFRESH_SECRET
        : secret === 'access'
        ? process.env.JWT_ACCESS_SECRET
        : process.env.JWT_SECRET;
    if (!SECRET) throw badImplementationException('SECRET is not defined on env file');

    const decode = jwt.verify(jwtoken, SECRET);
    if (typeof decode === 'string') throw unauthorizedException('JWT token is invalid');

    return decode;
  } catch (err: any) {
    console.error(err);
    throw unauthorizedException('JWT is not valid');
  }
};
