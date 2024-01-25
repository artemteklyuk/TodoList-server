import sequelize from "../db.js"
import {DataTypes} from "sequelize";

const User = sequelize.define("User", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
})

const List = sequelize.define("List", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Task = sequelize.define("Task", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    isComplete: {type: DataTypes.BOOLEAN, defaultValue: false},
    text: {type: DataTypes.TEXT, allowNull: false},
})

User.hasMany(List)
List.belongsTo(User)

List.hasMany(Task)
Task.belongsTo(List)

export {
    User,
    List,
    Task
}