import { HttpException } from '@nestjs/common';

export const throwErrorStatus = (message: string, statusCode: number) => {
  throw new HttpException(message, statusCode);
};
