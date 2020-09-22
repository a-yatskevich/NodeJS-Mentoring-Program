import { Sequelize, DataTypes } from 'sequelize';

class Group extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: DataTypes.INTEGER
                },
                name: {
                    type: DataTypes.STRING
                },
                permissions: {
                    type: DataTypes.ARRAY(DataTypes.STRING)
                }
            },
            {
                tableName: 'group',
                sequelize
            }
        );
    }

    static async addGroup(group) {
        return await this.create(group);
    }

    static async getAllGroups() {
        return await this.findAll();
    }

    static async getGroupById(id) {
        return await this.findByPk(id);
    }

    static async destroyById(id) {
        return await this.destroy({
            where: { id }
        });
    }

    static async updateGroup(id, updates) {
        const updatedGroup = await this.update(updates, {
            where: {
                id
            },
            returning: true
        });
        return updatedGroup[1];
    }
}

export default Group;
