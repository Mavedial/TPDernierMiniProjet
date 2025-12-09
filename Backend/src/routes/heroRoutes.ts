import { Router } from "express";
import {
    getHeroes,
    getHeroById,
    createHero,
    updateHero,
    deleteHero,
} from "../controllers/heroController";
import {verifyToken, isAdmin} from "../middleware/authMiddleware";
import {permit} from "../middleware/roleMiddleware";
import {upload} from "../middleware/uploadMiddleware";

const router = Router();

//routes publiques
router.get("/",getHeroes);
router.get("/:id",getHeroById);

//routes protegees
router.post("/", verifyToken, upload.single("image"), createHero);
router.put("/:id", verifyToken, upload.single("image"), updateHero);
router.delete("/:id", verifyToken, isAdmin, permit("admin"), deleteHero);

export default router;