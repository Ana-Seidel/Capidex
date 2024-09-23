const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//Conectar ao banco de dados
const db = new sqlite3.Database('./sqlite.db', (err) => {
    if (err) {
        console.error('Erro para conectar no banco de dados', err.message);
    } else {
        console.log('Conectado ao banco de dados');
    }
});