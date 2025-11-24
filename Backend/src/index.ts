import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectDB} from "./config/db";
import authRoute from "./routes/authRoutes";

connectDB();

app.use("/api/auth", authRoute);


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(` Serveur lancé sur le port ${PORT}`);
});
