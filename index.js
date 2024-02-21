const express =  require('express');
const moongose = require('mongoose');

//Trecho relativo à conexão ao MongoDB Atlas

const MONGO_ATLAS = "mongodb+srv://api:bdag2018@cluster0.sruq9pq.mongodb.net/?retryWrites=true&w=majority"

moongose.connect(MONGO_ATLAS);
const banco = moongose.connection;
banco.on("error", (erro) => {
    console.log(`Falha ao conectar no MongoDB Atlas: ${erro}`)
})

// Trecho relativo à criação dos endpoints da API
const app = express();

// Adicionamos o middleware para poder receber dados em JSON
app.use(express.json());

// Incluímos os endpoints definidos no arquivo endpoints.js
const endpoints = require("./endpoints");
app.use('/', endpoints);
const PORTA = 3000;

app.listen(PORTA, () => {
    console.log(`API inicializada e aguardando conexões.`)
})