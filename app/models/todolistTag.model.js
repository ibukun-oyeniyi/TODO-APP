module.exports = (sequelize, Sequelize) => {
    const TodolistTag = sequelize.define('todolistTag', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        });
    
  
    return TodolistTag;
  };
