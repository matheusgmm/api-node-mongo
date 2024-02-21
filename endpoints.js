const express = require("express");
const Produto = require("./produto");
const { Model } = require("mongoose");

// Criamos um objeto "roteador" para facilitar a criaçao do endpoint
const router = express.Router();

// Exportamos o roteador para poder ser utilizado em outros modulos
module.exports = router;

// GET - obter todos os produtos cadastrados
router.get("/produtos", async (req, res) => {
    try {
        const dados = await Produto.find();
        res.json(dados);

    } catch (error) {
        res.status(500).json({ "erro" : error.message });
    }
})

// POST - incluir um novo produto
router.post("/produtos", async (req, res) => {
    const dados = new Produto ({
        nome: req.body.nome,
        preco: req.body.preco,
        dataValidade: req.body.dataValidade
    });

    try {
        const dadosSalvos = await dados.save();
        res.status(201).json(dadosSalvos);

    } catch (error) {
        res.status(500).json({ "erro" : error.message });
    }
})

// GET por id - obtém um produto específico
router.get("/produtos/:id" , async (req, res) => {
    try {
        const dados = await Produto.findById(req.params.id)
        res.json(dados);

    } catch (error) {
        res.status(404).json({ "erro" : error.message })
    }
})

// PATCH por id - altera dados de um produto existente
router.patch("/produtos/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const dados = req.body;
        // Esta opção serve para incluir um produto não existente
        const opcoes = { new : true };
        const resultado = await Produto.findByIdAndUpdate(
            id, dados, opcoes
        );
        res.status(200).json(resultado);

    } catch (error) {
        res.status(500).json({ "erro" : error.message });
    }
})

// DELETE por id - exclui um produto existente
router.delete("/produtos/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const retorno = await Produto.findByIdAndDelete(id);
        res.status(200).json({ "excluido" : true });
    } catch (error) {
        res.status(400).json({ "erro" : error.message });
    }
})