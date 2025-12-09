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
    height?: string[]; // ex: ["5'10", "178 cm"]
    weight?: string[]; // ex: ["181 lb", "81 kg"]
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
    externalId?: number;
    name?: string;
    slug?: string;
    nom?: string;
    alias?: string;
    univers?: string;
    pouvoirs?: string[];
    description?: string;
    image?: string;
    origine?: string;
    premiereApparition?: string;
    createdAt?: Date;

    powerstats?: IPowerstats;
    appearance?: IAppearance;
    biography?: IBiography;
    work?: Record<string, unknown>;
    connections?: Record<string, unknown>;
    images?: IImages;

    rawData?: Record<string, unknown>;
}

const HeroSchema: Schema = new Schema(
    {
        externalId: { type: Number },
        name: { type: String },
        slug: { type: String },
        nom: { type: String },
        alias: { type: String },
        univers: { type: String, enum: ["Marvel", "DC", "Autre"], default: "Autre" },
        pouvoirs: { type: [String], default: [] },
        description: { type: String },
        image: { type: String },
        origine: { type: String },
        premiereApparition: { type: String },
        createdAt: { type: Date, default: Date.now },

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

        // Keep original raw object to avoid any data loss
        rawData: { type: Schema.Types.Mixed },
    },
    { strict: false } // allow extra fields if any — keeps flexibility
);

export default mongoose.model<IHero>("Hero", HeroSchema);