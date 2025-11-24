import 'dotenv/config';
import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// ROTA PRINCIPAL
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
      WHERE DATE(dm.data_entrada) BETWEEN '2025-11-01' AND '2025-11-30'
        AND dm.servico LIKE '17295-SEBRATEL-SUPORTE'
      ORDER BY data_entrada ASC;
    `);

    res.json(rows);
  } catch (err) {
    console.error("Erro na API:", err);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API Matrix rodando na porta ${PORT}`));
