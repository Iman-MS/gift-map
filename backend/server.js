import express from "express";
import dotenv from "dotenv";

//Route files
import users from "./routes/users.js";

//load enviroment variables
dotenv.config({ path: "./config/config.env" });

const app = express();

// Mount routers
app.use("/api/v1/users", users);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
