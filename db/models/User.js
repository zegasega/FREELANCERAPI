module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "freelancer", "client"),
      defaultValue: "freelancer",
      allowNull: false,
    },
    jwtTokenVersion: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  }, {
    timestamps: true,
    tableName: 'users'
  });
      User.associate = function(models) {
      User.hasMany(models.Review, {
        foreignKey: "reviewerId",
        as: "reviews",
        onDelete: "CASCADE",
      });

      User.hasMany(models.Job, {
        foreignKey: "clientId",
        as: "jobs",
        onDelete: "CASCADE",
      });
    };


  return User;
};
