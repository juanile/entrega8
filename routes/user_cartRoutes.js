const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")
const SECRET_KEY = "Clave Secreta"

router.use("/", (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
        console.log(decoded);
        next();
    } catch (err) {
        res.status(401).json({ message: "Usuario no autorizado"});
    }
});

// Endpoint para obtener el archivo JSON de cart
router.get('/', (req, res) => {
    // Lógica para obtener y enviar el archivo JSON de cart
    const user_cartData = require('../user_cart/25801.json');
    res.json(user_cartData);
});

module.exports = router;