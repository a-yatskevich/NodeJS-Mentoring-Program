import Sequelize from 'sequelize';
import config from '../config';
import { UserModel, GroupModel, UserGroupModel } from '../models';

export default async () => {
    try {
        const sequelize = new Sequelize(config.databaseURL, { logging: false });
        await sequelize.authenticate();
        console.log('Database is connected');

        UserModel.init(sequelize);
        GroupModel.init(sequelize);
        UserGroupModel.init(sequelize, UserModel, GroupModel);
        UserModel.belongsToMany(GroupModel, { through: UserGroupModel });
        GroupModel.belongsToMany(UserModel, { through: UserGroupModel });
        UserModel.sync();
        GroupModel.sync();
        UserGroupModel.sync();
    } catch {
        console.log('Something went wrong. Database is not connected');
    }
};
