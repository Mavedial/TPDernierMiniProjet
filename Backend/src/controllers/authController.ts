import {Request, Response} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
const MIN_LENGTH = 8;

//nouvelle utilisateur
export const register = async (req: Request, res: Response) => {
    try{
        const {username, password, role} =req.body;

        if(!username || !password){
            return res.status(400).json({message :"Nécessite un Username et un mots de passe !"})
        }
        if(!password || password.length < MIN_LENGTH){
            return res.status(400).json({message : "Le mot de passe doit contenir au minium 8 caractères !"});
        }


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
            role : role || "editor",
        });

        const { password:_, ...userWithoutPwd } = newUser.toObject();
        return res.status(201).json({ message: "Utilisateur créee",user: userWithoutPwd });
    } catch (error) {
        console.log("register error:",error);
        return res.status(500).json({message : "Erreur serveur"});
    }
};

//Login

export const login = async (req: Request, res: Response) => {
    try{
        const {username, password} = req.body;

        if(!username || !password){
            return res.status(400).json({message :"Nécessite un Username et un mots de passe !"})
        }

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
        console.log("login error",error);
        return res.status(500).json({message : "Erreur serveur"});
    }
}


