import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import carRoutes from "./src/routes/carRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use("/cars", carRoutes);

// Conectar ao MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://leilao:arleyisaac@cluster0.e1xcm.mongodb.net/leilaodb?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("🔥 Conectado ao MongoDB Atlas");
    app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => console.error("❌ Erro ao conectar ao MongoDB Atlas", err));
