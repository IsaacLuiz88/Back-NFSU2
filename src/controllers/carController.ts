import { Request, Response } from "express";
import Car from "../models/Car";
import { io } from "../../server"

// Criar um novo carro
export const createCar = async (req: Request, res: Response) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar o carro", details: err });
  }
};

// Controlador para listar todos os carros
export const getAllCars = async (req: Request, res: Response) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar os carros", details: err });
  }
};

// Controlador para atualizar um carro pelo ID
export const updateCarById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedCar = await Car.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCar) {
      return res.status(404).json({ error: "Carro não encontrado" });
    }
    res.json(updatedCar);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar o carro", details: err });
  }
};

// Controlador para deletar um carro pelo ID
export const deleteCarById = async (req: Request, res: Response) => {
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
};


// Controlador para fazer um lance em um carro
export const bidOnCar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { user, bidAmount } = req.body;
    
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ error: "Carro não encontrado" });
    }
    
    if (bidAmount <= car.currentPrice) {
      return res.status(400).json({ error: "O lance deve ser maior que o valor atual" });
    }
    
    car.bids.push({ user, bidAmount, timestamp: new Date() });
    car.currentPrice = bidAmount;
    await car.save();

    // Notificar todos os clientes sobre o novo lance
    io.emit("newBid", { carId: car._id, user, bidAmount });

    res.json({ message: "Lance feito com sucesso", car });
  } catch (err) {
    res.status(500).json({ error: "Erro ao fazer um lance", details: err });
  }
};

// Controlador para listar apenas carros vendidos / Buscar carros vendidos
export const getSoldCars = async (req: Request, res: Response) => {
  try {
    const soldCars = await Car.find({ status: "Vendido" });
    res.json(soldCars);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar os carros vendidos", details: err });
  }
};

// Adicionar avaliação a uma peça do carro
export const addPartRating = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { partName, rating } = req.body;

    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ error: "Carro não encontrado" });
    }

    car.parts.push({ name: partName, rating });
    await car.save();

    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ error: "Erro ao adicionar avaliação da peça", details: err });
  }
};

// Atualizar a avaliação de uma peça existente
export const updatePartRating = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { partName, rating } = req.body;

    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ error: "Carro não encontrado" });
    }

    const part = car.parts.find((p) => p.name === partName);
    if (!part) {
      return res.status(404).json({ error: "Peça não encontrada" });
    }

    part.rating = rating;
    await car.save();

    res.json(car);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar avaliação da peça", details: err });
  }
};
