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
        deadline: {
            type: Sequelize.DATE
        },
        position:{
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        file: {
            type: Sequelize.STRING,
            allowNull: true
        }

    });
    Task.associate = function(models) {
        Task.belongsTo(models.todo, { foreignKey: 'todolistId',onDelete: "cascade" });
        
    };
  
    return Task;
  };