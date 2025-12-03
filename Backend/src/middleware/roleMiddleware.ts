import {Request, Response, NextFunction} from "express"

export const permit= (...allowedRoles : string[]) =>{
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;
        if (!user) return res.status(401).json({message : "Non authentifié."})

        if(!allowedRoles.includes(user.role)){
            return res.status(403).json({message : "Accès refusé"});
        }
        next();
    }
}