import { debug } from "../utils/debug";
import { Client, Response } from "../models/types/types";

import { ClientService } from "./services/clientService";

class ClientController {
  async createClient(client: Client): Promise<Response> {
    try {
      const response = await ClientService.createClient(client);
      return response;
    } catch (error) {
      debug("Error creating client:", error as string);
      return { message: "Error creating client.", client };
    }
  }

  async getClientByID(id: string): Promise<Response> {
    try {
      const response = await ClientService.getClientByID(id);
      return response;
    } catch (error) {
      debug("Error getting client by ID:", error as string);
      return { message: "Error getting client by ID." };
    }
  }

  async getClients(): Promise<Response> {
    try {
      const response = await ClientService.getClients();
      return response;
    } catch (error) {
      debug("Error getting clients:", error as string);
      return { message: "Error getting clients." };
    }
  }

  async partiallyUpdateClient(
    id: string,
    updates: Partial<Client>
  ): Promise<Response> {
    try {
      const response = await ClientService.partiallyUpdateClient(id, updates);
      return response;
    } catch (error) {
      debug("Error updating client:", error as string);
      return { message: "Error updating client." };
    }
  }

  async deleteClient(id: string): Promise<Response> {
    try {
      const response = await ClientService.deleteClient(id);
      return response;
    } catch (error) {
      debug("Error deleting client:", error as string);
      return { message: "Error deleting client." };
    }
  }
}

export default ClientController;
