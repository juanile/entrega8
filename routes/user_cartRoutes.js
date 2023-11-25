const express = require('express');
const router = express.Router();


// Endpoint para obtener el archivo JSON de cart
router.get('/', (req, res) => {
    // Lógica para obtener y enviar el archivo JSON de cart
    const user_cartData = require('../user_cart/25801.json');
    res.json(user_cartData);
});

module.exports = router;