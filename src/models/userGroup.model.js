import { Sequelize } from 'sequelize';

class UserGroup extends Sequelize.Model {
    static init(sequelize, User, Group) {
        this.UserModel = User;
        this.GroupModel = Group;

        return super.init(
            {},
            {
                tableName: 'UserGroup',
                sequelize
            }
        );
    }

    static async addUsersToGroup(groupId, userId) {
        const transaction = await this.sequelize.transaction();

        try {
            const targetGroup = await this.GroupModel.findByPk(groupId, {
                transaction
            });

            if (!targetGroup) {
                throw Error('There is no such group');
            }

            const userToAdd = await this.UserModel.findByPk(userId, {
                transaction
            });

            if (!userToAdd) {
                throw Error('There is no such user');
            }

            await userToAdd.addGroup(targetGroup, {
                transaction
            });

            await transaction.commit();

            return userToAdd;
        } catch (error) {
            if (transaction) {
                transaction.rollback();
                throw error;
            }
        }
    }
}

export default UserGroup;
