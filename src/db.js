// Import the mysql2 library with promise support
import mysql from "mysql2/promise";

// Create a connection pool using environment variables
const pool = mysql.createPool({
  // Connection details
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 3306,
  
  // Pool management settings
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  
  // Enforce UTC timezone
  timezone: "Z"
});

// Export the pool for database queries
export default pool;