import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("API SuperHeroManager démarré!");
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarrer sur le port : ${PORT}`);
});
