import express from 'express';
import routes from '../routes';

export default (app) => {
    app.use(express.json());
    app.use('/', routes);
};
