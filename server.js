const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const winston = require('winston');

// Įkrauti .env failą
dotenv.config();

// Sukuriame logger su winston
const logger = winston.createLogger({
  level: 'info',  // Nustatome minimalų logų lygį (galima naudoti 'debug', 'info', 'warn', 'error')
  transports: [
    new winston.transports.Console(), // Išvedame logus į konsolę
    new winston.transports.File({ filename: 'server.log' }) // Ir į failą
  ]
});

const app = express();
const port = 4000;  // Pasirinktas prievadas

// Duomenų bazės prisijungimas
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Prisijungimo prie duomenų bazės tikrinimas
db.connect((err) => {
  if (err) {
    logger.error('Klaida jungiantis prie DB: ', err);
    return;
  }
  logger.info('Prisijungta prie MySQL duomenų bazės!');
});

// Middleware JSON duomenų apdorojimui
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST',
  credentials: true,
}));

// Šalinti renginius pagal ID
app.delete('/events/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM events WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      logger.error('Klaida pašalinant renginį: ', err);
      return res.status(500).send('Klaida pašalinant renginį');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Renginys nerastas');
    }
    logger.info('Renginys pašalintas: ' + id);
    res.status(200).send('Renginys pašalintas');
  });
});

// Renginių užklausos
app.get('/events', (req, res) => {
  const query = 'SELECT * FROM events';
  db.query(query, (err, results) => {
    if (err) {
      logger.error('Klaida gaunant renginius: ', err);
      return res.status(500).send('Klaida užklausoje');
    }
    res.json(results);
  });
});

// Pradėk serverį
app.listen(port, () => {
  logger.info(`Serveris veikia ant prievado ${port}`);
});
