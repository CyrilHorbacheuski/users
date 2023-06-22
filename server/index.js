const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const cors = require('cors')
const schema = require("./schema")
const { Sequelize, DataTypes } = require("sequelize");

const app = express()

const databaseOptions = {
    name: "usersdb",
    user: "root",
    password: "password",
    port: 5000,
    dialect: "mysql",
    host: "localhost",
    path: "/graphql"
}

const sequelize = new Sequelize(
    databaseOptions.name, 
    databaseOptions.user, 
    databaseOptions.password, 
    {
        dialect: databaseOptions.dialect,
        host: databaseOptions.host
    }
);

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: DataTypes.STRING,
    age: DataTypes.INTEGER,
}, {timestamps: false});


const root = {
    getAllUsers: () => {
        return User.findAll();
    },
    getUser: ({id}) => {
        return User.findByPk(id);
    },
    createUser: ({input}) => {
        const user = User.create({...input});
        
        return user;
    },
    deleteUser: ({id}) => {
        const deletedUserCount = User.destroy({ where: { id: id } }); 
        console.log(`Deleted row(s): ${deletedUserCount}`);

        return deletedUserCount;
    }
}

app.use(cors())
app.use(databaseOptions.path, graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root
}))

app.listen(databaseOptions.port, () => console.log(`Server started on port ${databaseOptions.port}`))