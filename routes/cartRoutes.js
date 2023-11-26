// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")
const SECRET_KEY = "Clave Secreta"
const db = require('../db/conn');

router.use("/", (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
        console.log(decoded);
        req.usuarioid = decoded.id
        next();
    } catch (err) {
        res.status(401).json({ message: "Usuario no autorizado"});
    }
});

// Endpoint para obtener el archivo JSON de cart
router.get('/', async (req, res) => {
    // Lógica para obtener y enviar el archivo JSON de cart
    const userId = req.usuarioid

    let conn = db.getConn();
    const productos = await conn.query(`SELECT * FROM carrito WHERE usuarioid = ${userId}`)
    console.log(productos);
    res.json(productos);
});

router.post('/', async (req, res) => {
    const prodId = req.body.pId 
    const userId = req.usuarioid

    let conn = db.getConn();
    const usuarios = await conn.query(`INSERT INTO carrito (usuarioid, productoid) VALUES ( ${userId}, ${prodId})`)
    console.log(usuarios);

    const cartData = require('../cart/buy.json');
    res.json(cartData);
});

module.exports = router;
