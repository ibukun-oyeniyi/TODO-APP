module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todo", {
        todolist_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
      description: {
          type: Sequelize.TEXT,
          allowNull: false,
          unique: false,
          defaultValue: ""
      },
      completed: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
      },
    });
    Todo.associate = function(user) {
        Todo.belongsTo(user, { foreignKey: 'userId' });
      };
  
    return Todo;
  };