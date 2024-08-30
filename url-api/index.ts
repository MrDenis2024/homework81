import express from "express";
import config from './config';
import cors from "cors";
import linksRouter from './routers/links';
import mongoose from "mongoose";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors(config.corsOptions));
app.use('/', linksRouter);

const run = async () => {
  await  mongoose.connect("mongodb://localhost/shortener");

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
