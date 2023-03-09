import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { json } from "body-parser";
import gql from "graphql-tag";

const typeDefs = gql`
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
        image: String
        amount: Int
    }

    type Query {
        userList: [UserList]
    }
`;

const dataSetUser = [
    {
        id: 1,
        name: "user 1",
        email: "user1@bucketstore.com",
        age: 1,
        orderList: [
            {
                id: 101,
                item: [
                    {
                        id: 1001,
                        category: "top",
                        name: "대충 옷 이름 111",
                        price: 100000,
                        image: "cloth1.png",
                        amount: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        name: "user 2",
        email: "user2@bucketstore.com",
        age: 2,
        orderList: [
            {
                id: 102,
                item: [
                    {
                        id: 1002,
                        category: "golf",
                        name: "대충 옷 이름 2222",
                        price: 200000,
                        image: "cloth2.png",
                        amount: 99,
                    },
                ],
            },
        ],
    },
    {
        id: 3,
        name: "user 3",
        email: "user2@bucketstore.com",
        age: 3,
        orderList: [
            {
                id: 103,
                item: [
                    {
                        id: 1003,
                        category: "golfwear",
                        name: "대충 옷 이름 3333",
                        price: 50000,
                        image: "cloth3.png",
                        amount: 2,
                    },
                    {
                        id: 1004,
                        category: "golfwear",
                        name: "대충 옷 이름 4444",
                        price: 50000,
                        image: "cloth4.png",
                        amount: 1,
                    },
                ],
            },
        ],
    },
];

const ItemList = [
    {
        id: 1001,
        category: "top",
        name: "대충 옷 이름 111",
        price: 100000,
        image: "cloth1.png",
    },
    {
        id: 1002,
        category: "golf",
        name: "대충 옷 이름 2222",
        price: 200000,
        image: "cloth2.png",
    },
    {
        id: 1003,
        category: "golfwear",
        name: "대충 옷 이름 3333",
        price: 50000,
        image: "cloth3.png",
    },
    {
        id: 1004,
        category: "golfwear",
        name: "대충 옷 이름 4444",
        price: 50000,
        image: "cloth4.png",
        amount: 1,
    },
];

const resolvers = {
    Query: {
        userList: () => dataSetUser,
    },
};

(async () => {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await apolloServer.start();

    const app = express();
    const port = 8080;

    app.use(
        "/graphql",
        cors<cors.CorsRequest>(),
        json(),
        expressMiddleware(apolloServer)
    );

    app.listen(port, () => {
        console.log(`connected at ${port}`);
    });
})();
