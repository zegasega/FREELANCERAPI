// models/Review.js
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    freelancerId: {  // Yorumu alan kişi
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reviewerId: {    // Yorumu yapan kişi (Client)
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    timestamps: true,
    tableName: "reviews",
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: "freelancerId",
      as: "freelancer",
      onDelete: "CASCADE",
    });

    Review.belongsTo(models.User, {
      foreignKey: "reviewerId",
      as: "reviewer",
      onDelete: "CASCADE",
    });

    Review.belongsTo(models.Job, {
      foreignKey: "jobId",
      as: "job",
      onDelete: "CASCADE",
    });
  };

  return Review;
};
