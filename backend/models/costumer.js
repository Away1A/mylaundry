import { DataTypes, Model } from 'sequelize';

class Customer extends Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
      },
    }, {
      sequelize,
      modelName: 'Customer',
      tableName: 'customers',
      timestamps: true,
    });
  }
}

export default Customer;
