import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import cors from "cors";
import dotevn from "dotenv";
import authRoutes from "./routes/auth.js";
import roleRoutes from "./routes/role.js"
import { register } from "./controllers/auth.js"

dotevn.config();
const app = express();
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.post("/auth/register", register);

// Routes
app.use("/auth", authRoutes);
app.use("/assignRole", roleRoutes)
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
