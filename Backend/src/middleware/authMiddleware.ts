import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken";

type TokenUser = {
    id: string;
    role: string;
    iat: number;
    exp: number;
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({message:"Token manquant"});
        }
        const token = authHeader.split(' ')[1]; //recuperation du token exemple " Bearer Lneafboafbaibae "[0] = bearer   [1] au token Lneafboafbaibae

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenUser;

        // stocker l'utilisateur dans req (au moins on a vérifié le token et le token est avec le user)
        (req as unknown as { user: TokenUser }).user = decoded;
        next(); // au suivant
    }catch(error){
        console.log("verify token error:", error);
        return res.status(401).json({message:"Token invalide"});
    }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = (req as unknown as { user: TokenUser }).user

    if(!user) return res.status(401).json({message: "Non authentifié"});

    if(user.role !== "admin"){
        return res.status(403).json({message:"Accès refusé (réservé admin)"});
    }
    next(); // au suivant
};