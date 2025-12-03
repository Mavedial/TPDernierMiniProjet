import multer from "multer";
import path from "path";

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

const fileFilter = (req : any, file : any, cb :any) => {
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