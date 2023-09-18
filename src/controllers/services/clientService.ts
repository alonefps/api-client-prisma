import prisma from "../../config/prisma";
import { Client, Response } from "../../models/types/types";

export class ClientService {
  static async createClient(client: Client): Promise<Response> {
    try {
      const createdClient = await prisma.client.create({
        data: client,
      });

      return { message: "New client created.", client: createdClient };
    } catch (error) {
      console.error("Error creating client:", error);
      return { message: "Error creating client.", client };
    }
  }

  static async getClientByID(id: string): Promise<Response> {
    try {
      const client = await prisma.client.findUnique({
        where: { id },
      });

      if (client) {
        return { message: "Client found by ID.", client };
      } else {
        return { message: "Client not found by ID." };
      }
    } catch (error) {
      console.error("Error getting client by ID:", error);
      return { message: "Error getting client by ID." };
    }
  }

  static async getClients(): Promise<Response> {
    try {
      const clients = await prisma.client.findMany();
      return { message: "List of clients.", client: clients };
    } catch (error) {
      console.error("Error getting clients:", error);
      return { message: "Error getting clients." };
    }
  }

  static async partiallyUpdateClient(
    id: string,
    updates: Partial<Client>
  ): Promise<Response> {
    try {
      const existingClient = await prisma.client.findUnique({
        where: { id },
      });

      if (!existingClient) {
        return { message: "Client not found" };
      }

      const updatedClient = await prisma.client.update({
        where: { id },
        data: updates,
      });

      return { message: "Client updated successfully", client: updatedClient };
    } catch (error) {
      console.error("Error updating client:", error);
      return { message: "Error updating client." };
    }
  }

  static async deleteClient(id: string): Promise<Response> {
    try {
      const client = await prisma.client.findUnique({
        where: { id },
      });

      if (!client) {
        return { message: "Client not found for deletion." };
      }

      await prisma.client.delete({
        where: { id },
      });

      return { message: "Client deleted.", client };
    } catch (error) {
      console.error("Error deleting client:", error);
      return { message: "Error deleting client." };
    }
  }
}
