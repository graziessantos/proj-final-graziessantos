const express = require('express');
const healthRoutes = require('./routes/health');

const app = express();

// Rotas
app.use('/', healthRoutes);

// Rota padrão
app.get('/', (req, res) => {
    res.send('API funcionando! Acesse /health para verificar status');
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
});