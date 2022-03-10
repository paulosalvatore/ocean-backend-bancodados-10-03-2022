const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "ocean_bancodados_10_03_2022";

async function main() {
  // Conexão com o bando de dados

  console.log("Conectando ao banco de dados...");

  const client = await MongoClient.connect(url);

  const db = client.db(dbName);

  const collection = db.collection("herois");

  console.log("Conexão com o banco de dados realizada com sucesso.");

  const app = express();

  // Sinaliza para o express entender o JSON no corpo das requisições
  app.use(express.json());

  // Endpoint principal
  app.get("/", function (req, res) {
    res.send("Hello World");
  });

  const herois = ["Mulher Maravilha", "Capitã Marvel", "Homem de Ferro"];
  //              0                    1                2

  // [GET] Read All (Ler individualmente)
  app.get("/herois", async function (req, res) {
    const documentos = await collection.find().toArray();

    res.send(documentos);
  });

  // [GET] Read Single (by Id) (Ler individualmente pelo ID)
  app.get("/herois/:id", async function (req, res) {
    // Acesso o parâmetro da rota chamado ID
    const id = req.params.id;

    // Pega o item da lista que corresponde a esse ID
    const item = await collection.findOne({ _id: new ObjectId(id) });

    res.send(item);
  });

  // [POST] Create (Criar)
  app.post("/herois", async function (req, res) {
    // Recebemos o item no corpo da requisição
    const item = req.body;

    // Adicionamos o item no banco
    await collection.insertOne(item);

    // Enviamos uma resposta de sucesso
    res.send(item);
  });

  // [PUT] Update (Atualizar)
  app.put("/herois/:id", function (req, res) {
    // Recebemos o ID que será atualizado
    const id = req.params.id;

    // Pegamos o novo item que foi enviado no corpo da requisição
    const novoItem = req.body;

    // Atualizamos o banco de dados com a nova informação
    collection.updateOne(
      { _id: ObjectId(id) },
      {
        $set: novoItem,
      }
    );

    // Enviamos uma mensagem de sucesso
    res.send(novoItem);
  });

  // [DELETE] Delete (Remover)
  app.delete("/herois/:id", async function (req, res) {
    // Recebemos o ID que será excluído
    const id = req.params.id;

    // Excluimos o ID do banco
    await collection.deleteOne({ _id: ObjectId(id) });

    // Enviamos uma mensagem de sucesso
    res.send("Item removido com sucesso!");
  });

  app.listen(3000);
}

main();
