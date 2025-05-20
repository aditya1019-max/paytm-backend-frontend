require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes");
const { connectDB } = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Connect to Database
connectDB();

// Routes
app.use("/api/v1", mainRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));