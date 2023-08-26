const PostCategory = (sequelize, DataTypes) => {
  const postCategory = sequelize.define(
    "PostCategory",
    {
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "post_id",
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "category_id", 
      },
    },
    {
      tableName: "posts_categories",
      timestamps: false,
      underscored: true,
    }
  );

  postCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: "categories",
      through: postCategory,
      foreignKey: "postId",
      otherKey: "categoryId",
    });

    models.Category.belongsToMany(models.BlogPost, {
      through: postCategory,
      foreignKey: "categoryId",
      otherKey: "postId",
      as: "blogPost",
    });
  };

  return postCategory;
};

module.exports = PostCategory;
