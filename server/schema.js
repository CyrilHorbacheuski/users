const {buildSchema} = require("graphql")

const schema = buildSchema(`
    type User {
        id: ID
        username: String
        age: Int
    }

    input UserInput {
        id: ID
        username: String!
        age: Int!
    }

    type Query {
        getAllUsers: [User]
        getUser(id: ID): User
    }

    type Mutation {
        createUser(input: UserInput): User
        deleteUser(id: ID): Int
    }
`)

module.exports = schema