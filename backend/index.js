const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const mongoDB = require("./db");

// Connect to MongoDB
mongoDB();

// Set up CORS headers using `cors` middleware
app.use(cors({
  origin: ["http://localhost:3000", "https://gofood-bt3j.onrender.com"], // Allowed origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"], // Allowed headers
  credentials: true, // If cookies or auth headers are needed
}));

// Parse JSON requests
app.use(express.json());

// API Routes
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

// Serve static files from the React build directory
const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, "frontend/build")));

// Catch-all route to serve React's index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
