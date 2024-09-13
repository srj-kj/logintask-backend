import logger from './logger'; 


const ERROR = {
  DATANOTFOUND: "Data not found",
  BADIMPLEMENTATION: "Bad implementation",
   UNAUTH : "Unauthorized"
};

export class HttpException extends Error {
  statusCode: number;
  message: string;
  errorMessage: string | string[];

  constructor(statusCode: number, messages: string | string[]) {
    super(typeof messages === 'string' ? messages : messages[0]);
    this.statusCode = statusCode || 500;
    this.message = typeof messages === 'string' ? messages : messages[0];
    this.errorMessage = messages;
  }
}


export const invalidException = (error: any): HttpException => {
  if (error) {
    logger.warn(error);
  } else {
    logger.warn(ERROR.DATANOTFOUND);
  }
  return new HttpException(400, error || ERROR.DATANOTFOUND);
};

export const dataNotExistException = (error: any): HttpException => {
  if (error) {
    logger.warn(error);
  } else {
    logger.warn(ERROR.DATANOTFOUND);
  }
  return new HttpException(400, error || ERROR.DATANOTFOUND);
};


export const badImplementationException = (error: any): HttpException => {
  if (error) {
    logger.error(error);
  } else {
    logger.error(ERROR.BADIMPLEMENTATION);
  }
  return new HttpException(500, error || ERROR.BADIMPLEMENTATION);
};

export const unauthorizedException = (error: any) => {
  error ? console.warn(error) : console.warn(ERROR);
  return new HttpException(401, error || ERROR.UNAUTH );
};