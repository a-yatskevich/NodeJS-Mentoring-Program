import { Sequelize, DataTypes, Op } from 'sequelize';

class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                age: {
                    type: DataTypes.INTEGER
                },
                id: {
                    autoIncrement: true,
                    primaryKey: true,
                    type: DataTypes.INTEGER
                },
                login: {
                    type: DataTypes.STRING
                },
                password: {
                    type: DataTypes.STRING
                }
            },
            {
                tableName: 'users',
                sequelize
            }
        );
    }

    static async addUser(user) {
        return await this.create(user);
    }

    static async findById(id) {
        return await this.findByPk(id);
    }

    static async updateUser(id, updates) {
        const updatedUser = await this.update(updates, {
            where: { id },
            returning: true
        });
        return updatedUser[1];
    }

    static async destroyById(id) {
        return await this.destroy({
            where: { id }
        });
    }

    static async getAllUsers() {
        return await this.findAll();
    }

    static async findByLoginAndLimit(login, limit) {
        const { rows } = await this.findAndCountAll({
            where: login && {
                login: {
                    [Op.substring]: login
                }
            },
            limit
        });

        return rows;
    }
}

export default User;
