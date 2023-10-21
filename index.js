import express from "express";
import dotenv from "dotenv";
import app from "./app.js";
import mongoose from "mongoose";
dotenv.config();

// env variables
const { DATABASE_URL } = process.env;
const PORT = process.env.PORT || 8000;

app.use(express.json());

mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true })
  .then(() => console.log("MongoDb is connected..."))
  .catch((err) => console.log(err + "Mongodb Connection error"));

app.listen(PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
