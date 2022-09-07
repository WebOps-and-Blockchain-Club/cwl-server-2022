import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import "reflect-metadata";
import * as dotenv from "dotenv";
import { createConnection } from "typeorm";
import entities from "./entities";
import resolvers from "./resolver/index";
dotenv.config();

const PORT = process.env.PORT || 8000;

const main = async () => {
  const schema = await buildSchema({
    resolvers,
  });
  const server = new ApolloServer({
    schema,
  });

  server.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`);
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
