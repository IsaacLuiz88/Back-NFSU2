//database connection with mongodb
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export function connectToDatabase() {
    const uri = process.env.MONGO_URI;
    
    if(!uri){
        console.log("❌ URI de conexão com o MongoDB não encontrada");
        process.exit(1);
    }
   
    mongoose.connect(uri)
      .then(() => console.log("🔥 Conectado ao MongoDB Atlas"))
      .catch((err) => console.error("❌ Erro ao conectar ao MongoDB Atlas", err));
}