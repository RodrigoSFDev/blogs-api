const Category = (sequelize, DataTypes) => {
  const category = sequelize.define(
    "Category",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "categories",
      timestamps: false,
      underscored: true,
    }
  );
  category.associate = (models) => {
    category.belongsToMany(models.BlogPost, {
      through: models.PostCategory,
      foreignKey: "categoryId",
      as: "blogPosts",
    });
  };
  return category;
};

module.exports = Category;
