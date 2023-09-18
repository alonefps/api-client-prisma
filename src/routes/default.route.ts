import { FastifyInstance } from "fastify";

export async function defaultRoute(server: FastifyInstance) {
  server.get("/", (request, reply) => {
    reply.send("Client CRUD System");
  });
}
