const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

//Conectar ao banco de dados
const db = new sqlite3.Database('./capivaras.db', (err) => {
    if (err) {
        console.error('Erro para conectar no banco de dados', err.message);
    } else {
        console.log('Conectado ao banco de dados');
    }
});

//Rotas da API
app.get('/capivaras', (req, res) => {
    db.all('SELECT * FROM capivaras', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Mapear os dados para substituir valores nulos por texto padrão
        const modifiedRows = rows.map(row => ({
            nome: row.nome || 'Sem registo',
            idade: row.idade !== null ? row.idade : 'Sem registo',
            peso: row.peso !== null ? row.peso : 'Sem registo',
            status_saude: row.status_saude || 'Sem registo',
            habitat: row.habitat || 'Sem registo',
            comportamento: row.comportamento || 'Sem registo',
            dieta: row.dieta || 'Sem registo',
            data_registro: row.data_registro || 'Sem registo',
            observacoes: row.observacoes || 'Sem registo'
        }));

        res.json(modifiedRows);
    });
});

app.post('/capivaras', (req, res) => {
    const { nome, idade, peso, status_saude, habitat, comportamento, dieta, data_registro, observacoes } = req.body;
    
    const query = `
        INSERT INTO capivaras (nome, idade, peso, status_saude, habitat, comportamento, dieta, data_registro, observacoes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    db.run(query, [nome, idade, peso, status_saude, habitat, comportamento, dieta, data_registro, observacoes], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
});

//Para iniciar
app.listen(PORT, () => {
    console.log(`O servidor está funcionando na porta ${PORT}`);
});