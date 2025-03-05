import express from "express";
import Car from "../models/Car";
import { io } from "../../server"

const router = express.Router();

// Rota para criar um novo carro
router.post("/", async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar o carro", details: err });
  }
});

// Rota para listar todos os carros
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar os carros", details: err });
  }
});

// Rota para atualizar um carro pelo ID
router.put("/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const updatedCar = await Car.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCar) {
      return res.status(404).json({ error: "Carro não encontrado" });
    }
    return res.json(updatedCar);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao atualizar o carro", details: err });
  }
});

// Rota para fazer um lance em um carro
router.post("/:id/bid", async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { user, bidAmount } = req.body;
    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({ error: "Carro não encontrado" });
    }

    car.bids.push({ user, bidAmount, timestamp: new Date() });
    car.currentPrice = bidAmount;
    await car.save();

    // Evento emitindo uma notificação toda vez que alguém faz um lance.
    io.emit("update_bid", { carId: id, user, bidAmount });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: "Erro ao fazer um lance", details: err });
  }
});



// Rota para deletar um carro pelo ID
router.delete("/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const deletedCar = await Car.findByIdAndDelete(id);

    if (!deletedCar) {
      return res.status(404).json({ error: "Carro não encontrado" });
    }

    res.json({ message: "Carro deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar o carro", details: err });
  }
});

export default router;
