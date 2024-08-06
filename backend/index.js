import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 50001;

app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Home Page of authentication server");
});

app.listen(PORT, (error) => {
  if (error) return console.log("error in starting server", error);
  console.log(`Server is running at http://localhost:${PORT}`);
  connectDB();
});
