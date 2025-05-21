module.exports = (sequelize, DataTypes) => {
  const ClientProfile = sequelize.define("ClientProfile", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    companyName: { type: DataTypes.STRING },
    website: { type: DataTypes.STRING },
    about: { type: DataTypes.TEXT },
    hiringGoal: { type: DataTypes.STRING },
    hourlyPay : { type: DataTypes.FLOAT} 
  }, {
    timestamps: true,
    tableName: "client_profiles",
  });

  ClientProfile.associate = (models) => {
    ClientProfile.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };

  return ClientProfile;
};
