import {Request, Response} from "express";
import Hero from "../models/Hero";
import fs from "fs";
import path from "path";
import {logger} from "../utils/logger";

// Necessité de faire des types car l'utilisation de any n'est pas possible
// === TYPES ===

interface HeroQueryParams {
    research?: string;
    univers?: string;
    ordre?: "alpha" | "recent";
}

interface HeroBody {
    nom: string;
    alias?: string;
    univers?: string;
    pouvoirs?: string | string[];
    description?: string;
    origine?: string;
    premiereApparition?: string;
}

interface RequestWithFile extends Request {
    file?: Express.Multer.File;
}

interface HeroDocument {
    _id: string;
    nom: string;
    alias?: string;
    univers?: string;
    pouvoirs: string[];
    description?: string;
    origine?: string;
    premiereApparition?: string;
    image?: string;
    createdAt?: Date;
}

interface MongoFilter {
    univers?: string;
    nom?: {
        $regex: string;
        $options: string;
    };
}

// === CONTROLLERS ===

// GET HEROES
export const getHeroes = async (req: Request, res: Response) => {
    try {
        const { research, univers, ordre } = req.query as HeroQueryParams;
        const filter: MongoFilter = {};

        if (univers) filter.univers = univers;
        if (research) filter.nom = { $regex: research, $options: "i" };// $regex = recherche dans un texte // $options= ignore majuscules/minuscules


        let query = Hero.find(filter);

        if (ordre === "alpha") {
            query = query.sort({ nom: 1 });
        } else if (ordre === "recent") {
            query = query. sort({ createdAt: -1 });// 1:ascendant -1 : Descendant
        }

        const heroes = await query. exec();
        return res.json(heroes);
    } catch (error) {
        logger.error("getHeroes error:", error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

// GET HERO BY ID
export const getHeroById = async (req: Request, res: Response) => {
    try {
        const hero = await Hero.findById(req.params.id);
        if (!hero) return res.status(404).json({ message: "Héros introuvable..." });
        return res.json(hero);
    } catch (error) {
        logger.error("getHeroById error:", error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

// CREATE HERO
export const createHero = async (req: RequestWithFile, res: Response) => {
    try {
        const { nom, alias, univers, pouvoirs, description, origine, premiereApparition } = req.body as HeroBody;
        const image = req.file ? req.file.filename : undefined;

        if (!nom) {
            logger.warn("Tentative de création de héros sans nom");
            return res. status(400).json({ message: "Le champs NOM est obligatoire !" });
        }

        const parsedPouvoirs = pouvoirs
            ? (typeof pouvoirs === "string" ? JSON.parse(pouvoirs) : pouvoirs)
            : [];
        // si pouvoirs exite alors si c'est un string je mets dans un tableau -> sinon je garde -> est si rien envoyé []

        const hero = await Hero.create({
            nom,
            alias,
            univers,
            pouvoirs: parsedPouvoirs,
            description,
            origine,
            premiereApparition,
            image,
        });
        logger.info(`Héros crée : ${hero.nom} (ID: ${hero._id})`);
        return res.status(201). json(hero);
    } catch (error) {
        logger.error("createHero error:", error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

// UPDATE HERO
export const updateHero = async (req: RequestWithFile, res: Response) => {
    try {
        const updateData: Partial<HeroDocument> = { ...req.body };// ... copie tout req.body dans updateData

        if (updateData.pouvoirs && typeof updateData.pouvoirs === "string") { // si updateDate.pouvoirs existe et qu'il est du type string
            updateData.pouvoirs = JSON.parse(updateData.pouvoirs);
        }

        if (req.file) {
            const fileName = req.file.filename;
            updateData.image = fileName;// ajout de l'objet

            // Supprimer l'ancienne image si existante
            const hero = await Hero.findById(req.params.id) as HeroDocument | null;
            if (hero && hero.image) {
                const oldPath = path.join(__dirname, "../uploads", hero.image);// construction du chemin de l'image
                if (fs.existsSync(oldPath)) { // vérification si le fichier existe belle et bien
                    fs.unlinkSync(oldPath); // supprime l'ancienne image
                }
            }
        }

        const updated = await Hero.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updated) return res. status(404).json({ message: "Héros introuvable." });
        return res.json(updated);
    } catch (error) {
        logger.error("updateHero erreur:", error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

// DELETE HERO
export const deleteHero = async (req: Request, res: Response) => {
    try {
        const hero = await Hero.findByIdAndDelete(req.params.id) as HeroDocument | null;  // supprime le héros par mongoose
        if (!hero){
            logger.warn(`Tentative de suppresion d'un héros inexistant (ID: ${req.params.id})`);
            return res. status(404).json({ message: "Héros introuvable." });
        }

        if (hero.image) {
            const imagePath = path.join(__dirname, "../uploads", hero.image);// construction du chemin de l'image
            if (fs.existsSync(imagePath)) { // vérification si le fichier existe belle et bien
                fs.unlinkSync(imagePath); // supprime l'ancienne image
            }
        }
        logger.info(`Héros supprimé: ${hero.nom} (ID: ${hero._id})`);
        return res.json({ message: "Héros supprimé !" });

    } catch (error) {
        logger.error("deleteHero erreur:", error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};