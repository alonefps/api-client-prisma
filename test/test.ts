import axios, { AxiosResponse, AxiosError } from "axios";

axios.defaults.baseURL = "http://127.0.0.1:3333";

// Tipos para as respostas da API
interface Client {
  id: string;
  name: string;
  number: string;
  address: string;
}

// Função para exibir os resultados
function showResult(
  response:
    | AxiosResponse<Client[]>
    | AxiosResponse<Client>
    | AxiosResponse<void>
) {
  console.log(response.data);
}

// Função para lidar com erros
function handleError(error: any) {
  if (axios.isAxiosError(error)) {
    console.error("Erro na solicitação:", error.message);
  } else {
    console.error("Erro desconhecido:", error);
  }
}

// Função para listar todos os clientes
async function listClients() {
  try {
    const clientsResponse = await axios.get<Client[]>("/clients");
    showResult(clientsResponse);
  } catch (error) {
    handleError(error);
  }
}

// Função para criar um novo cliente
async function createClient() {
  const newClientData = {
    name: "Rosangela",
    number: "41995641273",
    address: "Rua Rio Grande do Sul, 123",
  };

  try {
    const createClientResponse = await axios.post<Client>(
      "/client",
      newClientData
    );
    showResult(createClientResponse);
  } catch (error) {
    handleError(error);
  }
}

// Função para obter um cliente por ID
async function getClientById() {
  const clientId = "a762ed53-0cca-42bf-89ac-0fccde574118";

  try {
    const getClientResponse = await axios.get<Client>(`/client/${clientId}`);
    showResult(getClientResponse);
  } catch (error) {
    handleError(error);
  }
}

// Função para atualizar um cliente por ID
async function updateClient() {
  const clientId = "a762ed53-0cca-42bf-89ac-0fccde574118";
  const updatedClientData = {
    name: "Igor Oliveira de Souza",
  };

  try {
    const updateClientResponse = await axios.put<Client>(
      `/client/${clientId}`,
      updatedClientData
    );
    showResult(updateClientResponse);
  } catch (error) {
    handleError(error);
  }
}

// Função para excluir um cliente por ID
async function deleteClient() {
  const deleteClientId = "8481a79b-7d4f-41c0-9131-2389ebeb2256";

  try {
    await axios.delete<void>(`/client/${deleteClientId}`);
    console.log("Cliente excluído com sucesso.");
  } catch (error) {
    handleError(error);
  }
}

// Menu de escolha
async function chooseFunction() {
  console.log("Escolha a função que deseja executar:");
  console.log("1. Listar todos os clientes");
  console.log("2. Criar um novo cliente");
  console.log("3. Obter um cliente por ID");
  console.log("4. Atualizar um cliente por ID");
  console.log("5. Excluir um cliente por ID");

  const option = await prompt("Digite o número da função desejada: ");
  switch (option) {
    case "1":
      await listClients();
      chooseFunction();
      break;
    case "2":
      await createClient();
      chooseFunction();
      break;
    case "3":
      await getClientById();
      chooseFunction();
      break;
    case "4":
      await updateClient();
      chooseFunction();
      break;
    case "5":
      await deleteClient();
      chooseFunction();
      break;
    default:
      console.log("Opção inválida.");
  }
}

// Função auxiliar para obter entrada do usuário
function prompt(question: string): Promise<string> {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question(question, (answer: string | PromiseLike<string>) => {
      readline.close();
      resolve(answer);
    });
  });
}

// Executar o menu de escolha
chooseFunction();
