module.exports = (sequelize, Sequelize) => {
    const TodolistTag = sequelize.define('todolistTag', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        });
      TodolistTag.associate = function(model) {
        TodolistTag.belongsTo(model.todo, { foreignKey: 'todoId' });
        TodolistTag.belongsTo(model.tag, { foreignKey: 'tagId' });  
      };
  
    return TodolistTag;
  };
