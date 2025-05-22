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
      type: DataTypes.ENUM("open", "assigned", "closed", "paused"),
      defaultValue: "open",
    },
    assignedFreelancerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, {
    timestamps: true,
    tableName: "jobs",
  });

  Job.associate = (models) => {
    Job.belongsTo(models.User, {
      foreignKey: "clientId",
      as: "client",
      onDelete: "CASCADE",
    });

    Job.belongsTo(models.User, {
      foreignKey: "assignedFreelancerId",
      as: "assignedFreelancer",
      onDelete: "SET NULL",
    });

    Job.hasMany(models.Proposal, {
      foreignKey: "jobId",
      as: "proposals",
      onDelete: "CASCADE",
    });

    Job.hasMany(models.Review, {
      foreignKey: "jobId",
      as: "reviews",
      onDelete: "CASCADE",
    });
  };

  return Job;
};
