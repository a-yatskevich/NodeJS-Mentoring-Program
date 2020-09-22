import Sequelize from 'sequelize';
import config from '../config';
import * as models from '../models';

export default async () => {
    try {
        const sequelize = new Sequelize(config.databaseURL);
        await sequelize.authenticate();
        console.log('Database is connected');

        Object.values(models).forEach((model) => {
            model.init(sequelize);
            model.sync();
        });
    } catch {
        console.log('Something went wrong. Database is not connected');
    }
};
