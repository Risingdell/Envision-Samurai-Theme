import express from "express";
import cors from "cors";
import { db } from "./db.js";
import teamRoutes from "./routes/teamRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/team", teamRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
