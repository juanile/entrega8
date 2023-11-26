const mariadb = require('mariadb');
const fs = require('fs').promises;
const path = require('path');

let conn;
const pool = mariadb.createPool({
  host: '127.0.0.1', 
  user: 'root', 
  password: '1234',
  database: 'ecommerce',
  connectionLimit: 5
});

function getConn() {
  return conn;
}

async function createConection() {
  conn = await pool.getConnection();
  const rows = await conn.query("SELECT 1 as val");
  console.log(rows); // [{ val: 1 }, meta: ... ]
}

module.exports = { createConection, getConn };

async function cargarDatosDesdeCarpeta(rutaCarpeta) {
    try {
      await createConection();
  
      // Lee la lista de archivos en la carpeta
      const archivos = await fs.readdir(rutaCarpeta);
  
      for (const archivo of archivos) {
        if (archivo.endsWith('.json')) {
          const rutaCompleta = path.join(rutaCarpeta, archivo);
          const contenidoJSON = await fs.readFile(rutaCompleta, 'utf8');
          
          try {
            // Intenta analizar el contenido JSON
            const producto = JSON.parse(contenidoJSON);
  
            if (producto) {
                const query = 'INSERT INTO productos ( name, unitCost, currency, image) VALUES ( ?, ?, ?, ?)';
                const values = [ producto.name, producto.cost, producto.currency, producto.image];
  
                await getConn().query(query, values);
                await getConn().query('COMMIT');
  
              console.log(`Datos cargados desde ${archivo} en la tabla.`);
            } else {
              console.error(`El archivo JSON '${archivo}' no contiene un array de productos.`);
            }
          } catch (error) {
            console.error(`Error al analizar el archivo JSON '${archivo}':`, error);
          }
        }
      }
  
      console.log('Todos los datos cargados exitosamente.');
    } catch (error) {
      console.error('Error al cargar datos desde la carpeta:', error);
    } finally {
      await getConn().release(); // Libera la conexión al finalizar
    }
  }
  
  // Llamada a la función con la ruta de la carpeta
  cargarDatosDesdeCarpeta('products');
  