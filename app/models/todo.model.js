module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todo", {
      task_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
      description: {
          type: Sequelize.TEXT,
          allowNull: false,
          unique: true
      },
      completed: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          default: false
      },
    });
    Todo.associate = function(models) {
        Todo.belongsTo(models.user, { foreignKey: 'user_id' });
      };
  
    return Todo;
  };