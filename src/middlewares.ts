import { NextFunction, Request, Response } from 'express';
import { students } from '@prisma/client'; // Asegúrate de usar `students` si es necesario

import Boom from '@hapi/boom'; // Importa Boom correctamente

import ErrorResponse from './interfaces/ErrorResponse';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  if (Boom.isBoom(err)) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
  }
}
