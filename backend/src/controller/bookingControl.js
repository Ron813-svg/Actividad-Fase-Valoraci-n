import bookingModel from "../model/Booking.js";

const bookingControl = {};

bookingControl.get = async (req, res) => {
  try {
    const booking = await bookingModel.find();
    console.log(booking);

    res.json(booking);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las reservas: " + error });
  }
};

bookingControl.getById = async (req, res) => {
  try {
    const bookingId = await bookingModel.findById(req.params.id);
    console.log(bookingId);
    res.json(bookingId);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las reservas: " + error });
  }
};

bookingControl.post = async (req, res) => {
  try {
    const { clientId, vehicle, service, status } = req.body;

    const newBooking = await bookingModel({
      clientId,
      vehicle,
      service,
      status,
    });

    await newBooking.save();

    console.log(newBooking);
    res
      .status(200)
      .json({ message: "Se ha agregado correctamente" + newBooking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al ingresar la nueva reservas: " + error });
  }
};

bookingControl.put = async (req, res) => {
  try {
    const { clientId, vehicle, service, status } = req.body;

    const updateBooking = await bookingModel.findByIdAndUpdate(
      req.params.id,
      { clientId, vehicle, service, status },
      { new: true }
    );

    console.log(updateBooking);
    res.status(200).json({ message: "Se ha actualizado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar la reserva: " + error });
  }
};

bookingControl.delete = async (req, res) => {
  try {
    const deleteBooking = await bookingModel.findByIdAndDelete(req.params.id);

    console.log(deleteBooking);
    res
      .status(200)
      .json({ message: "Se ha eliminado correctamente" + deleteBooking });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la reserva: " + error });
  }
};

export default bookingControl;
