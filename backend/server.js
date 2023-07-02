import express from "express";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import colors from "colors";

import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";

import connectDB from "./config/db.js";

//load enviroment variables
dotenv.config({ path: "./config/config.env" });

//connect to database
connectDB();

//Route files
import users from "./routes/users.js";
import gifts from "./routes/gifts.js";
import auth from "./routes/auth.js";

const app = express();

// body parser
app.use(express.json());

// using middle ware
app.use(logger);

// File uploading
app.use(fileUpload());

// Set static folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// Mount routers
app.use("/api/v1/users", users);
app.use("/api/v1/gifts", gifts);
app.use("/api/v1/auth", auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  //close server and exit process
  server.close(() => process.exit(1));
});
