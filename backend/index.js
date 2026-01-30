require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db.js");

const aiRoutes = require("./routes/aiRoute.js");
const exportRoutes = require("./routes/exportRoute.js");
const authRoutes = require("./routes/authRoute.js");
const bookRoutes = require("./routes/bookRoute.js");

const app = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve uploaded files
app.use("/backend/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to Database
connectDB();

// Health Check Endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use("/api/ai", aiRoutes);
app.use("/api/export", exportRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server is running on port ${PORT}`)
);

