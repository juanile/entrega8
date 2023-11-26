const express = require('express');
//const mariadb = require("mariadb");
const cartRoutes = require('./routes/cartRoutes'); // Importa la ruta de cart
const catRoutes = require('./routes/catRoutes');
const cats_productsRoutes = require('./routes/cats_productsRoutes');
const productsRoutes = require('./routes/productsRoutes');
const products_commentsRoutes = require('./routes/products_commentsRoutes');
const sellRoutes = require('./routes/sellRoutes');
const user_cartRoutes = require('./routes/user_cartRoutes');
const jwt = require("jsonwebtoken");
const db = require('./db/conn');
const SECRET_KEY = "Clave Secreta"



const app = express();
const port = 3000;

app.use(express.json());


app.use('/cart', cartRoutes);

app.use('/cat', catRoutes);

app.use('/cats_products', cats_productsRoutes);

app.use('/products_comments', products_commentsRoutes);

app.use('/products', productsRoutes);

app.use('/sell', sellRoutes);

app.use('/user_cart', user_cartRoutes);

app.post("/login", login);

async function login(req, res) {
    const { username, password } = req.body;
    let conn = db.getConn();
    const usuarios = await conn.query("select * FROM usuarios")
    console.log(usuarios);
    const usuario = usuarios.find(u => u.username === username)
    if (usuario && usuario.password === password) {
        const token = jwt.sign({ id : usuario.id }, SECRET_KEY);
        res.status(200).json({ token });
    } else {
        res.status(401).json({ message: "Usuario y/o contraseña incorrecto"});
    }
};

db.createConection();

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
