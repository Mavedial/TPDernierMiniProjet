import multer, {FileFilterCallback} from "multer";
import path from "path";
import {Request} from "express";

const storage = multer.diskStorage({
    destination : function (req,file, cb){
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename : function (req,file, cb){
        const safeName= file.originalname.replace(/\s+/g, "-");
        const unique = Date.now() + "-" + safeName;
        cb(null, unique);
    },
});

const fileFilter = (req : Request, file : Express.Multer.File, cb :FileFilterCallback) => {
    if(file.mimetype.startsWith("image/")){
        cb(null,true);
    } else{
        cb(new Error("On ne veut que des images !"));
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits : { fileSize : 2 *1024 *1024},
});