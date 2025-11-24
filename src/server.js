// Load environment variables
import 'dotenv/config'; 
import express from "express"; 
import cors from "cors"; 
// Database connection pool
import pool from "./db.js"; 

const app = express(); 

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Main API Route: Fetch matrix data for the current month
app.get("/matrix", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
          protocolo,
          DATE(data_entrada) AS data_entrada,
          CAST(data_fila AS DATETIME) AS data_fila,
          CAST(data_atendimento AS DATETIME) AS data_atendimento,
          TIMESTAMPDIFF(SECOND, data_fila, data_atendimento) AS TME_seg
      FROM API_WebDeveloper.db_matrix AS dm
      WHERE
          -- Filter data_entrada for the current month
          DATE(dm.data_entrada) >= DATE_FORMAT(NOW(), '%Y-%m-01')
          AND DATE(dm.data_entrada) <= LAST_DAY(NOW())
          AND dm.servico LIKE '17295-SEBRATEL-SUPORTE'
      ORDER BY data_entrada ASC;
    `);

    // Send data as JSON
    res.json(rows); 
  } catch (err) {
    console.error("API Error:", err); 
    res.status(500).json({ error: "Internal server error" }); 
  }
});

// Set port and start server
const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => console.log(`Matrix API running on port ${PORT}`));