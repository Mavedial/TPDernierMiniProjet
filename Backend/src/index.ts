import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectDB} from "./config/db";
import authRoute from "./routes/authRoutes";
import heroRoute from "./routes/heroRoutes";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
    })
);
app.use(express.json());


// Routes
app.use("/api/auth", authRoute);
app.use("/api/heros", heroRoute);

const PORT = process.env.PORT || 5000;
connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Serveur lancé sur le port ${PORT}`);
    });
})
    .catch((err) => {
        console.error("Impossible de démarrer le serveur, erreur de connexion DB:", err);
        process.exit(1);
    });
