import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectToDatabase } from "./database";
import cors from "cors";
import carRoutes from "./src/routes/carRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB Atlas
connectToDatabase();

// Rotas
app.use("/cars", carRoutes);


app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));