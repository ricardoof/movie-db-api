const express = require('express');
const app = express();
const path = require('path');

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'src')));

// Endpoint para fornecer a API Key ao cliente
app.get('/apiKey', (_, res) => {
    res.json({ apiKey: process.env.TMDB_API_KEY });
});

// Rota para servir o arquivo index.html
app.get('*', (_, res) => {
    const filePath = path.join(__dirname, 'src', 'index.html');
    console.log(`Servindo arquivo: ${filePath}`);
    res.sendFile(filePath);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

