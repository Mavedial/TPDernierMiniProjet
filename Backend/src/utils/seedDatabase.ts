import mongoose from "mongoose";
import Hero from "../models/Hero";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import {logger} from "./logger";

dotenv.config();

const seedDatabase = async ()=> {
    try{
        await mongoose.connect(process.env.MONGO_URI!);
        logger.info("MongoDB Connecté");

        const dataPath = path.join(__dirname, "../SuperHerosComplet.json")
        const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

        await Hero.deleteMany({}); // Nettoyer la base
        await Hero.insertMany(data);

        logger.info(`${data.length} heros importés`);
        process.exit(0);
    }catch(error){
        logger.error("Erreur",error);
        process.exit(1);
    }
};

seedDatabase();