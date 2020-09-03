import express from 'express';
import config from './config';
import appLoaders from './loaders';

const initApp = async () => {
    const app = express();
    await appLoaders({ app });
    const port = config.port || 3000;
    app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
};

initApp();
