const Sequelize = require("sequelize")
const configDetails = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DATABASE: "todo",
    DIALECT: 'mysql',
    POOL: {
        MAX: 5,
        MIN: 0,
        ACQUIRE: 30000,
        IDLE: 10000
    }
}


const sequelize = new Sequelize(
    configDetails.DATABASE,
    configDetails.USER,
    configDetails.PASSWORD, {
        host: configDetails.HOST,
        dialect: configDetails.DIALECT,
        pool: {
            max: configDetails.POOL.MAX,
            min: configDetails.POOL.MIN,
            acquire: configDetails.POOL.ACQUIRE,
            idle: configDetails.POOL.IDLE
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const User = require("../models/users.model.js")(sequelize, Sequelize)
const Tutorial = require("../models/tutorial.model.js")(sequelize, Sequelize)
const Todo = require("../models/todo.model")(sequelize, Sequelize)

Todo.belongsTo(User)

db.user = User
db.tutorial = Tutorial
db.todo = Todo

module.exports = db