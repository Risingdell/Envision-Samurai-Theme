import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  const sql = `
    SELECT 
      d.department_name,
      e.event_name,
      e.event_type
    FROM events e
    JOIN departments d ON d.id = e.department_id
    ORDER BY d.department_name, e.event_type
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch events" });
    }

    const grouped = {};

    rows.forEach(row => {
      if (!grouped[row.department_name]) {
        grouped[row.department_name] = {
          technical: [],
          nonTechnical: []
        };
      }

      if (row.event_type === "Technical") {
        grouped[row.department_name].technical.push(row.event_name);
      } else {
        grouped[row.department_name].nonTechnical.push(row.event_name);
      }
    });

    res.json(grouped);
  });
});

export default router;
