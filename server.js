const express = require('express');
const app = express();
const path = require('path');

// Define a variável de ambiente da API Key
const apiKey = process.env.TMDB_API_KEY;

// Middleware para servir arquivos estáticos
app.use(express.static('src'));

// Rota para servir o arquivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Endpoint para fornecer a API Key ao cliente
app.get('/apiKey', (req, res) => {
    res.json({ apiKey });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
