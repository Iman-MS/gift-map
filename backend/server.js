import express from "express";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import cors from "cors";

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

// Cookie parser
app.use(cookieParser());

// using middle ware
app.use(logger);

// File uploading
app.use(fileUpload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent cross site scripting attacks
app.use(xss());

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 10 * 60 * 1000, // 10mins
//   max: 1000,
// });
// app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable cors
// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
app.use(cors());

// Set static folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// Mount routers
app.use("/api/v1/users", users);
app.use("/api/v1/gifts", gifts);
app.use("/api/v1/auth", auth);

app.use(errorHandler);

// running built react app from backend
// app.use(express.static(path.join(__dirname, "..", "frontend", "build")));
app.use(express.static(path.join(__dirname, "build")));

// being able to use react app routes
// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
// });
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

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
