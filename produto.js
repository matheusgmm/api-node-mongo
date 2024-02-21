const mongoose = require('mongoose');

const modeloProduto = new mongoose.Schema (
    {
        nome: {
            type: String,
            required: true
        },
        preco: {
            type: Number,
            required: true
        },
        dataValidade: {
            type: Date
        }
    }
)

module.exports =  mongoose.model("Produto", modeloProduto);