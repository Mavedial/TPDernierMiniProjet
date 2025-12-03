import mongoose from "mongoose";

export const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        console.error("MONGO_URI non défini");
        process.exit(1);
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connecté");
    } catch (error) {
        console.log("Erreur connexion MongoDB :", error);
        process.exit(1);
    }
};
