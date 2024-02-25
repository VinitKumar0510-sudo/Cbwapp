import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'mysql://root:password@localhost:3306/cbwapp'
);

export class GitCommand extends Model {
  public id!: number;
  public command!: string;
  public output!: string;
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

GitCommand.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  command: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  output: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'success',
  }
}, {
  sequelize,
  modelName: 'GitCommand',
});

export class SequelizeService {
  async init() {
    await sequelize.sync();
  }

  async createCommand(data: { command: string; output: string; status?: string }) {
    await this.init();
    return await GitCommand.create(data);
  }

  async getAllCommands() {
    await this.init();
    return await GitCommand.findAll({
      order: [['createdAt', 'DESC']]
    });
  }

  async getCommandById(id: number) {
    await this.init();
    return await GitCommand.findByPk(id);
  }

  async updateCommand(id: number, data: { command?: string; output?: string; status?: string }) {
    await this.init();
    await GitCommand.update(data, { where: { id } });
    return await GitCommand.findByPk(id);
  }

  async deleteCommand(id: number) {
    await this.init();
    return await GitCommand.destroy({ where: { id } });
  }
}

export default new SequelizeService();