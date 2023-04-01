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
  Todo.associate = function(model) {
      Todo.belongsTo(model.user, { foreignKey: 'userId' });
    };

    Todo.associate = function(model) {
      Todo.hasMany(model.task, { foreignKey: 'todolistId', onDelete: "cascade" });
    };

    Todo.associate = function(model) {
      Todo.belongsToMany(model.tag, { through: model.todolistTag });
    };

  return Todo;
};