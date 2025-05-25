// models/customer.js
import { DataTypes, Model } from 'sequelize';

export default class Customer extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: 'Customer',
        tableName: 'customers',
        underscored: true,
      }
    );
  }
}
