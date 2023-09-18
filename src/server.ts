import "dotenv/config";
import { fastify } from "fastify";
import cors from "@fastify/cors";

import { corsOptions } from "./config/cors.config";
import { clientRoute } from "./routes/client.route";
import { defaultRoute } from "./routes/default.route";

const server = fastify();

const port: number = Number(process.env.PORT) || 3333;

server.register(cors, corsOptions);

server.register(defaultRoute);
server.register(clientRoute);

server.listen({ port, host: "0.0.0.0" }, (err) => {
  if (err) throw err;
  console.log(`Server is running on address http://localhost:${port}`);
});
