import mongoose from "mongoose";
import Hero from "../models/Hero";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const seedDatabase = async ()=> {
    try{
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log("MongoDB Connecté");

        const dataPath = path.join(__dirname, "../SuperHerosComplet.json")
        const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

        await Hero.deleteMany({}); // Nettoyer la base
        await Hero.insertMany(data);

        console.log(`${data.length} heros importés`);
        process.exit(0);
    }catch(error){
        console.log("Erreur",error);
        process.exit(1);
    }
};

seedDatabase();