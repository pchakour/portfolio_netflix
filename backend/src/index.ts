import express, { Express } from "express";
import cors from "cors";
import { createHandler } from "graphql-http/lib/use/express";
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ruruHTML } from "ruru/server";
import EducationGql from './graphql/schemas/Education.graphql';
import ExperienceGql from './graphql/schemas/Experience.graphql';
import ProjectGql from './graphql/schemas/Project.graphql';
import QueryGql from './graphql/schemas/Query.graphql';
import EducationResolver from './graphql/resolvers/Education.js';
import ExperienceResolver from './graphql/resolvers/Experience.js';
import ProjectResolver from './graphql/resolvers/Project.js';
import { mergeTypeDefs } from "@graphql-tools/merge";


const app = express();
app.use(cors());
app.use(express.static('public'))

async function initGraphQl(server: Express) {
  const typeDefs = mergeTypeDefs([ProjectGql, QueryGql, EducationGql, ExperienceGql]);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers: [ProjectResolver, EducationResolver, ExperienceResolver],
  });
  
   
  // Create and use the GraphQL handler.
  server.all(
    "/graphql",
    createHandler({
      schema,
    })
  );

  // Serve the GraphiQL IDE.
  server.get("/ruru", (_req, res) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: "/graphql" }))
  });
}
 

initGraphQl(app).then(() => {
  // Start the server at port
  app.listen(4000)
  console.log("Running a GraphQL API server at http://localhost:4000/ruru")
});
 

