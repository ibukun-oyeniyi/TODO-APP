const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const configDetails = {
    HOST: "127.0.0.1",
    USER: "root",
    PASSWORD: process.env.PASSWORD,
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
const Todo = require("../models/todo.model")(sequelize, Sequelize)
const Task = require("../models/task.model")(sequelize, Sequelize)
const Tag = require("../models/tag.model")(sequelize, Sequelize)
const TodolistTag = require("../models/todoTag.model")(sequelize, Sequelize)



db.user = User;
db.todo = Todo;
db.task = Task;
db.tag = Tag;
db.todolistTag = TodolistTag


User.associate(db);
TodolistTag.associate(db);
Todo.associate(db);
Tag.associate(db);




module.exports = db