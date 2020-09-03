import expressLoader from './experess';
import sequelizeLoader from './sequelize';

export default async ({ app }) => {
    expressLoader(app);
    await sequelizeLoader();
};
