import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'e_ticketing',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool; 