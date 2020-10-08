import express from 'express';
import config from './config';
import winston from './config/winston';
import appLoaders from './loaders';

const initApp = async () => {
    const app = express();
    await appLoaders({ app });
    const port = config.port || 3000;
    app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
};

process
    .on('unhandledRejection', (err) => {
        winston.error(`Unhandled Rejection: ${err.message}.\n ${err.stack}\n Shutting down...`);
        winston.on('finish', () => process.exit(1));
        winston.end();
    })
    .on('uncaughtException', (err) => {
        winston.error(`Unhandled Exception: ${err.message}.\n ${err.stack}\n Shutting down...`);
        winston.on('finish', () => process.exit(1));
        winston.end();
    });

initApp();
