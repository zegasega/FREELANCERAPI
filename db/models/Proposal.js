module.exports = (sequelize, DataTypes) => {
  const Proposal = sequelize.define("Proposal", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coverLetter: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    proposedRate: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted", "rejected"),
      defaultValue: "pending",
    },
  }, {
    timestamps: true,
    tableName: "proposals",
  });

  Proposal.associate = (models) => {
    Proposal.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
    });

    Proposal.belongsTo(models.Job, {
      foreignKey: "jobId",
      as: "job",
      onDelete: "CASCADE",
    });
  };

  return Proposal;
};
