import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { json } from "body-parser";
import dataSetUser from "./data/FetchUser";
import dataSetItem from "./data/FetchItem";
import { typeDefs } from "./data/gqlTypeDef";

const resolvers = {
    Query: {
        userList: () => dataSetUser,
        itemList: () => dataSetItem,
    },
    OrderList: {
        item: (obj) => {
            return obj.item.map((id) => {
                return dataSetItem.find((item) => item.id === id);
            });
        },
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
