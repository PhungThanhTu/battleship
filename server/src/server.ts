import { createServer } from "http";

import Express from 'express'
import { createGameSocketServer } from "./socket/socket";
import mongoose from "mongoose";
import "dotenv/config";

const app = Express();

const server = createServer(app);


const mongoConnectionString = process.env.MONGO ?? '';

mongoose.connect(mongoConnectionString);

mongoose.connection.on("connected", () => {
  console.log('Mongo connected successfully');
})

createGameSocketServer(server);

const PORT = process.env.PORT ?? 5500;

server.listen(PORT, () => {
  console.log("Server started successfully");
  const address = (server.address() as { address: string }).address;
  console.info(`Listening on ${address}:${PORT}`);
})

