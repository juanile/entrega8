const express = require('express');
const router = express.Router();


// Endpoint para obtener el archivo JSON de cart
router.get('/', (req, res) => {
    // Lógica para obtener y enviar el archivo JSON de cart
    const sellData = require('../sell/publish.json');
    res.json(sellData);
});

module.exports = router;