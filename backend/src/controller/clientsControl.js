import clientsModel from "../model/Clients.js";
import bcryptjs from "bcryptjs";

const clientsControl = {};

clientsControl.get = async (req, res) => {
  try {
    const clients = await clientsModel.find();
    console.log(clients);
    
    res.json(clients)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener datos: " + error });
  }
};

clientsControl.getById = async (req, res) => {
  try {
    const clientsId = await clientsModel.findById(req.params.id);
    console.log(clientsId);
    res.json(clientsId)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener datos: " + error });
  }
};

clientsControl.post = async (req, res) => {
  try {
    const { name, email, password, phone, age } = req.body;

  
    if (!name || !email || !password || !phone || !age) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Formato de correo electrónico inválido" });
    }

    const phoneRegex = /^\d{8}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Formato de teléfono inválido (8 dígitos)" });
    }

    if (typeof age !== "number" || age < 18) {
      return res.status(400).json({ message: "Edad inválida" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres" });
    }

    let existingClient = await clientsModel.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const passwordHash = await bcryptjs.hash(password, 10);

    const newClients = new clientsModel({
      name,
      email,
      password: passwordHash,
      phone,
      age,
    });

    await newClients.save();

    console.log(newClients);
    res.status(200).json({ message: "Cliente agregado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al ingresar datos: " + error });
  }
};

clientsControl.put = async (req, res) => {
  try {
    const { name, email, password, phone, age } = req.body;

  
    if (!name || !email || !password || !phone || !age) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Formato de correo electrónico inválido" });
    }

    const phoneRegex = /^\d{8}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Formato de teléfono inválido (8 dígitos)" });
    }

    if (typeof age !== "number" || age < 0) {
      return res.status(400).json({ message: "Edad inválida" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres" });
    }

    const passwordHash = await bcryptjs.hash(password, 10);

    const updateClients = await clientsModel.findByIdAndUpdate(
      req.params.id,
      { name, email, password: passwordHash, phone, age },
      { new: true }
    );

    console.log(updateClients);

    res.status(200).json({ message: "Cliente actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar los datos: " + error });
  }
};


clientsControl.delete = async (req, res) => {
  try {
    const deleteClient = await clientsModel.findByIdAndDelete(req.params.id);

    console.log(deleteClient);

    res.status(200).json({ message: "Cliente Eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar los datos: " + error });
  }
};

export default clientsControl;
