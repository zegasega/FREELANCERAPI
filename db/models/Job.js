module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define("Job", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, 
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    hourlyRate: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("open", "closed", "paused"),
      defaultValue: "open",
    },
  });

  Job.associate = (models) => {
    Job.belongsTo(models.User, {
      foreignKey: "clientId",
      as: "client",
    });
  };

  return Job;
};
