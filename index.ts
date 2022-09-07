import { ApolloServer } from "apollo-server"
import { buildSchema } from 'type-graphql';
import "reflect-metadata";
import * as dotenv from "dotenv";
import { createConnection } from "typeorm";
import entities from "./entities";
import resolvers from "./resolver/index"
import jwt from "jsonwebtoken";
import Volunteer from "./entities/volunteer";
import authChecker from "./utils/authchecker";
dotenv.config();
const main = async () => {
    const schema = await buildSchema({
        resolvers, authChecker: authChecker
    });
    const server = new ApolloServer({
        schema,
        context: async ({ req }: { req: any }) => {
            let volunteer;
            if (req.headers.authorization) {
                try {
                    const token = req.headers.authorization;
                    const decoded: any = jwt.verify(
                        token.split("Bearer ")[1],
                        process.env.JWT_SECRET!
                    );
                    volunteer = await Volunteer.findOne({ id: decoded });
                    return { volunteer: volunteer };
                } catch (e) {
                    console.log(`message ${e}`);
                }
            }

        },
    });

    server.listen(4000, () => {
        console.log("server started on http://localhost:4000");
    });
};
createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities,
    synchronize: true,
    logging: true,
})
    .then(() => {
        console.log("DATABASE CONNECTED");
        main();
    })
    .catch((e) => {
        console.log({ message: e });
    });
