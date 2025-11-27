import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectDB} from "./config/db";
import authRoute from "./routes/authRoutes";
dotenv.config();

const app = express();

app.use("/api/auth", authRoute);
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => {
    console.log(` Serveur lancé sur le port ${PORT}`);
});
