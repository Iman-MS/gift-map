import express from "express";
import dotenv from "dotenv";
import logger from "./middleware/logger.js";
import connectDB from "./config/db.js";

//load enviroment variables
dotenv.config({ path: "./config/config.env" });

//connect to database
connectDB();

//Route files
import users from "./routes/users.js";

const app = express();

app.use(logger);

// Mount routers
app.use("/api/v1/users", users);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);

  //close server and exit process
  server.close(() => process.exit(1));
});
