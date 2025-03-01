import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';
import AppError from '../../errors/AppError';
import '@shared/infra/typeorm';
import '@shared/container/';

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3333);
console.log('started');
