const express = require("express");
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
app.get("/herois", function (req, res) {
    res.send(herois.filter(Boolean));
});

// [GET] Read Single (by Id) (Ler individualmente pelo ID)
app.get("/herois/:id", function (req, res) {
    // Acesso o parâmetro da rota chamado ID
    const id = req.params.id - 1;

    // Pega o item da lista que corresponde a esse ID
    const item = herois[id];

    res.send(item);
});

// [POST] Create (Criar)
app.post("/herois", function (req, res) {
    // Recebemos o item no corpo da requisição
    const item = req.body.nome;

    // Adicionamos o item na lista
    herois.push(item);

    // Enviamos uma resposta de sucesso
    res.send("Item adicionado com sucesso!");
});

// [PUT] Update (Atualizar)
app.put("/herois/:id", function (req, res) {
    // Recebemos o ID que será atualizado
    const id = req.params.id - 1;

    // Pegamos o novo item que foi enviado no corpo da requisição
    const novoItem = req.body.nome;

    // Atualizamos a lista atual com a nova informação
    herois[id] = novoItem;

    // Enviamos uma mensagem de sucesso
    res.send("Item atualizado com sucesso!");
});

// [DELETE] Delete (Remover)
app.delete("/herois/:id", function (req, res) {
    // Recebemos o ID que será excluído
    const id = req.params.id - 1;

    // Excluimos o ID da lista
    delete herois[id];

    // Enviamos uma mensagem de sucesso
    res.send("Item removido com sucesso!");
});

app.listen(3000);
