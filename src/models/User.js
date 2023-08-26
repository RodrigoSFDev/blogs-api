const User = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "users",
      timestamps: false,
      underscored: true,
    }
  );

  user.associate = (models) => {
    user.hasMany(models.BlogPost, {
      foreignKey: "userId", // user_id
      as: "blogPosts",
    });
  };
  
  return user;
};

module.exports = User;
