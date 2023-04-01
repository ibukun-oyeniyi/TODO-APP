module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
   
      description: {
          type: Sequelize.TEXT,
          allowNull: false,
          unique: false,
      },
      checked: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
      },
      priority: {
        type: Sequelize.STRING,
        validate: {
            isIn: [["urgent", "not urgent"]]
        },
        defaultValue: "not urgent"
    },

    });
    Task.associate = function(models) {
        Task.belongsTo(models.todo, { foreignKey: 'todolistId' });
        
    };
  
    return Task;
  };