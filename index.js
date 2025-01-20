const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/cep/:cep", async (req, res) => {
    const { cep } = req.params;

    if (!/^\d{5}-?\d{3}$/.test(cep)) {
        return res.status(400).json({ error: "CEP inválido. Use o formato 12345-678 ou 12345678."})
    }

    try {

        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (response.data.erro) {
            return res.status(404).json({ error: "CEP não encontrado."})
        }

        res.json(response.data);
     } catch (error) {
        res.status(500).json({ error: "Erro ao consultar o CEP. Tente novamente mais tarde."})
     }
})

app.listen(PORT, () =>{
    console.log (`Servidor rodando em http://localhost:${PORT}`);
});