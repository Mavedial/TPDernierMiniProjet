import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectDB} from "./config/db";
import authRoute from "./routes/authRoutes";
import heroRoute from "./routes/heroRoutes";
import path from "path";
import {logger} from "./utils/logger";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
    })
);
app.use(express.json());
app.use("uploads", express.static(path.join(__dirname, "uploads")));


// Routes
app.use("/api/auth", authRoute);
app.use("/api/heros", heroRoute);

const PORT = process.env.PORT || 5000;
connectDB()
.then(() => {
    app.listen(PORT, () => {
        logger.info(`Serveur lancé sur le port ${PORT}`);
    });
})
    .catch((err) => {
        logger.error("Impossible de démarrer le serveur, erreur de connexion DB:", err);
        process.exit(1);
    });
