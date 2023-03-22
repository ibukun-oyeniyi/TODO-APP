const Sequelize = require("sequelize")
const User = require("../models/users.model.js")
const Tutorial = require("../models/tutorial.model.js")


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

db.user = User(sequelize, Sequelize);
db.tutorial = Tutorial(sequelize, Sequelize);

module.exports = db