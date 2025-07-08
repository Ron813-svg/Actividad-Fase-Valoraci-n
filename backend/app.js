import express from "express";
import cookieParser from "cookie-parser";

//Rutas de uso
import clientsRoute from "./src/routes/clients.js";
import bookingRoute from "./src/routes/booking.js";

//Importaciones para el uso de swaggerUi

import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());
app.use(cookieParser());

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve("./Documentacion.json"), "utf-8")
);

app.use("/api/clients", clientsRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
});

export default app;
