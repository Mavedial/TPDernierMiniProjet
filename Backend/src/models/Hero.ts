import mongoose, {Document, Schema } from "mongoose";

export interface IHero extends Document {
    nom: string;
    alias: string;
    univers: string;
    pouvoirs: string[];
    description: string;
    image: string;
    origine: string;
    premiereApparition: string;
    createdAt: Date;
}

const HeroSchema: Schema = new Schema({
    nom: {type: String, required: true},
    alias: {type: String},
    univers: {type: String, enum: ["Marvel", "DC", "Autre"], default: "Autre"},
    pouvoirs: {type: [String], default: []},
    description: {type: String},
    image: {type: String},
    origine: {type: String},
    premiereApparition: {type: String},
    createdAt: {type: Date, default: Date.now},
});

export default mongoose.model<IHero>("Hero", HeroSchema);