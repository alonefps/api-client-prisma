import { z } from "zod";
import { FastifyInstance, FastifyRequest } from "fastify";
import ClientController from "../controllers/clientController";
import { clientSchema } from "../models/schemas/client.schema";
import { Response } from "../models/types/types";

const clientController = new ClientController();
const idParamSchema = z.string();

export async function clientRoute(server: FastifyInstance) {
  server.post("/client", async (req, rep) => {
    try {
      const clientData = clientSchema.parse(req.body);
      const response: Response = await clientController.createClient(
        clientData
      );
      rep.send(response);
    } catch (error) {
      rep.status(400).send({ error: "Invalid request body." });
    }
  });

  server.get("/clients", async (req, rep) => {
    const response: Response = await clientController.getClients();
    rep.send(response);
  });

  server.get(
    "/client/:id",
    async (req: FastifyRequest<{ Params: { id: string } }>, rep) => {
      try {
        const id = idParamSchema.parse(req.params.id);
        const response: Response = await clientController.getClientByID(id);
        if (response.client) {
          rep.send(response);
        } else {
          rep.status(404).send({ message: "Client not found." });
        }
      } catch (error) {
        rep.status(400).send({ error: "Invalid ID format." });
      }
    }
  );

  server.delete(
    "/client/:id",
    async (req: FastifyRequest<{ Params: { id: string } }>, rep) => {
      try {
        const id = idParamSchema.parse(req.params.id);
        const response: Response = await clientController.deleteClient(id);
        if (response.client) {
          rep.send(response);
        } else {
          rep.status(404).send({ message: "Client not found." });
        }
      } catch (error) {
        rep.status(400).send({ error: "Invalid ID format." });
      }
    }
  );

  server.put(
    "/client/:id",
    async (req: FastifyRequest<{ Params: { id: string } }>, rep) => {
      try {
        const id = idParamSchema.parse(req.params.id);
        const clientUpdates = clientSchema.partial().parse(req.body);
        const response: Response = await clientController.partiallyUpdateClient(
          id,
          clientUpdates
        );
        if (response.client) {
          rep.send(response);
        } else {
          rep.status(404).send({ message: "Client not found." });
        }
      } catch (error) {
        rep.status(400).send({ error: "Invalid ID format or request body." });
      }
    }
  );
}
