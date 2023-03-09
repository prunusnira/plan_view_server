import gql from "graphql-tag";

export const typeDefs = gql`
    # graphql
    # Define Types in project
    type UserList {
        id: ID!
        name: String
        email: String
        age: Int
        orderList: [OrderList]
    }

    type OrderList {
        id: ID!
        item: [Item]
    }

    type Item {
        id: ID!
        category: String
        name: String
        price: Int
        image: [String]
        amount: Int
    }

    type Query {
        userList: [UserList]
        itemList: [Item]
    }
`;
