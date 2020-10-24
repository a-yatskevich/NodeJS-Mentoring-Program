import express from 'express';
import cors from 'cors';
import routes from '../routes';
import winston from '../config/winston';
import customLogger from '../middlewares/logger.middleware';
import errorHandler from '../middlewares/errorHandler.middleware';

export default (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(customLogger);
    app.use('/', routes);
    app.use(errorHandler(winston));
};
