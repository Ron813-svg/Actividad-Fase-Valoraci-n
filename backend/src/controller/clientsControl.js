import clientsModel from "../model/Clients.js";
import bcryptjs from "bcryptjs";

const clientsControl = {};

clientsControl.get = async (req, res) => {
  try {
    const clients = await clientsModel.find();
    console.log(clients);
    res.status(200).json({ message: "Datos obtenidos" });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener datos: " + error });
  }
};

clientsControl.getById = async (req, res) => {
  try {
    const clientsId = await clientsModel.findById(req.params.id);
    console.log(clientsId);
    res.status(200).json({ message: "Datos obtenidos" });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener datos: " + error });
  }
};

clientsControl.post = async (req, res) => {
  try {
    const { name, email, password, phone, age } = req.body;

    const passwordHash = await bcryptjs.hash(password, 10);

    const newClients = await clientsModel({
      name,
      email,
      password: passwordHash,
      phone,
      age,
    });

    await newClients.save();

    console.log(newClients);
    res.status(200).json({ message: "Cliente Agregado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al ingresar datos: " + error });
  }
};

clientsControl.put = async (req, res) => {
  try {
    const { name, email, password, phone, age } = req.body;

    const passwordHash = await bcryptjs.hash(password, 10);

    const updateClients = await clientsModel.findByIdAndUpdate(
      req.params.id,
      { name, email, password: passwordHash, phone, age },
      { new: true }
    );

    console.log(updateClients);

    res.status(200).json({ message: "Cliente Actualizado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar los datos: " + error });
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
