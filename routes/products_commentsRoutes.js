const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


// Endpoint para obtener el archivo JSON de cats_products
router.get('/', (req, res) => {
    // Obtén la ruta del directorio
    const directoryPath = path.join(__dirname, '../products_comments/');

    // Lee la lista de archivos en el directorio
    const files = fs.readdirSync(directoryPath);

    // Crea un objeto para almacenar los datos de todos los archivos
    const allData = {};

    // Itera sobre cada archivo y agrégalo al objeto
    files.forEach((file) => {
        const fileName = path.parse(file).name;
        const filePath = path.join(directoryPath, file);
        const fileData = require(filePath);
        allData[fileName] = fileData;
    });

    // Envía el objeto con todos los datos
    res.json(allData);
});

module.exports = router;
