import {Request, Response} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

//nouvelle utilisateur
export const register = async (req: Request, res: Response) => {
    try{
        const {username, password, role} =req.body;

        // Vérifier si l'utilisateur existe déjà
        const existingUser= await User.findOne({username});
        if(existingUser){
            return res.status(400).json({message : "Utilisateur déjà existant !"});
        }

        // Hasher le mdp compréhension de bcrypt via cette vidéo youtube : https://www.youtube.com/watch?v=_XxrfGrdrB8
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //créer l'utilisateur
        const newUser = await User.create({
            username,
            password : hashedPassword,
            role : role || "user",
        });
        return res.status(201).json({message: "Utilisateur créé",user : newUser});
    } catch (error) {
        return res.status(500).json({message : "Erreur serveur",error});
    }
};

//Login

export const login = async (req: Request, res: Response) => {
    try{
        const {username, password} = req.body;

        //Trouver l'utilisateur
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({message : "Utilisateur introuvable !"});
        }

        //Vérifier le mdp
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message : "Mot de passe incorrect !"});
        }

        //Créer un token JWT
        const token = jwt.sign(
            {id:user._id, role: user.role},
            process.env.JWT_SECRET!,
            {expiresIn: "7d"}
        );

        //retourne le message de réussite ,le token et le user
        return res.json({
            message: "Connexion réussie !",
            token,
            user: {username: user.username, role : user.role},
        });
    } catch (error) {
        return res.status(500).json({message : "Erreur serveur",error});
    }
}


