import expressLoader from './express.loader';
import sequelizeLoader from './sequelize.loader';

export default async ({ app }) => {
    expressLoader(app);
    await sequelizeLoader();
};
