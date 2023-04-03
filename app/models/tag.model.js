module.exports = (sequelize, Sequelize) => {
    const Tag = sequelize.define('tag', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        });
        Tag.associate = function(models) {
            Tag.belongsToMany(models.todo, { through: models.todolistTag });
            Tag.hasMany(models.todolistTag,{ foreignKey: 'tagId', onDelete: "cascade" });
        };
  
    return Tag;
  };
