import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectToDatabase } from "./database";
import cors from "cors";
import carRoutes from "./src/routes/carRoutes";
import { Server } from "socket.io";
import { createServer } from "http";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

export const io = new Server(httpServer, {cors: {origin: "*"}});

// Conectar ao MongoDB Atlas
connectToDatabase();

// Rotas
app.use("/cars", carRoutes);

app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));