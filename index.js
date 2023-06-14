const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const PORT = process.env.PORT || 5000;
const app = express();

// load routes
const authRoutes = require("./src/routes/auth");
const postsRoutes = require("./src/routes/posts");
const categoriesRoutes = require("./src/routes/categories");

// Load env vars
dotenv.config({ path: "./config.env" });

// initialize middlewares
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// use routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/categories", categoriesRoutes);
// route not found
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Server Error");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
