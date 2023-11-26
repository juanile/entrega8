const mariadb = require('mariadb');
let conn;
const pool = mariadb.createPool({
    host: '127.0.0.1', 
    user:'root', 
    password: '1234',
    database: 'ecommerce',
    connectionLimit: 5
});

function getConn() {

    return conn;
 //try {
  
   //const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
  // console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
 //} catch (err) {
  // throw err;
//  } finally {
//    if (conn) return conn.end();
//  }
}

async function createConection()  {
    conn = await pool.getConnection();
   const rows = await conn.query("SELECT 1 as val");
   console.log(rows); //[ {val: 1}, meta: ... ]
}

module.exports = {createConection, getConn} 