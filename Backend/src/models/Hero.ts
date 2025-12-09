import mongoose, { Document, Schema } from "mongoose";

export interface IPowerstats {
    intelligence?: number;
    strength?: number;
    speed?: number;
    durability?: number;
    power?: number;
    combat?: number;
}

export interface IAppearance {
    gender?: string;
    race?: string;
    height?: string[]; // ex: ["5'5", "165 cm"]
    weight?: string[]; // ex: ["126 lb", "57 kg"]
    eyeColor?: string;
    hairColor?: string;
}

export interface IBiography {
    fullName?: string;
    alterEgos?: string;
    aliases?: string[];
    placeOfBirth?: string;
    firstAppearance?: string;
    publisher?: string;
    alignment?: string;
}

export interface IImages {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
}

export interface IHero extends Document {
    id?: number; // id présent dans le JSON source
    name?: string;
    slug?: string;

    powerstats?: IPowerstats;
    appearance?: IAppearance;
    biography?: IBiography;
    work?: Record<string, unknown>;
    connections?: Record<string, unknown>;
    images?: IImages;

    nom?: string;
    alias?: string;
    univers?: string;
    pouvoirs?: string[];
    description?: string;
    origine?: string;
    premiereApparition?: string;

    createdAt?: Date;
    rawData?: Record<string, unknown>;
}

const HeroSchema: Schema = new Schema(
    {
        // Source id (numérique) — représente "id" dans votre JSON
        id: { type: Number, index: true },

        // Données principales
        name: { type: String, index: true },
        slug: { type: String, index: true },

        powerstats: {
            intelligence: Number,
            strength: Number,
            speed: Number,
            durability: Number,
            power: Number,
            combat: Number,
        },

        appearance: {
            gender: String,
            race: String,
            height: [String],
            weight: [String],
            eyeColor: String,
            hairColor: String,
        },

        biography: {
            fullName: String,
            alterEgos: String,
            aliases: [String],
            placeOfBirth: String,
            firstAppearance: String,
            publisher: String,
            alignment: String,
        },

        work: { type: Schema.Types.Mixed },
        connections: { type: Schema.Types.Mixed },

        images: {
            xs: String,
            sm: String,
            md: String,
            lg: String,
        },

        // Champs de compatibilité/front
        nom: { type: String },
        alias: { type: String },
        univers: { type: String, default: "Autre" },
        pouvoirs: { type: [String], default: [] },
        description: { type: String },
        origine: { type: String },
        premiereApparition: { type: String },

        // Conserver l'objet brut si besoin
        rawData: { type: Schema.Types.Mixed },


        createdAt: { type: Date, default: Date.now },
    },
    {
        strict: false,
    }
);


export default mongoose.model<IHero>("Hero", HeroSchema, "heroes");