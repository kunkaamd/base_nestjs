import { MulterModule } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { extname } from "path";
import { diskStorage } from 'multer'
import { ConfigService } from "@nestjs/config";


const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

const editFileName = (req,file,callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    callback(null, `${uniqueSuffix}${fileExtName}`)
}

export const imageFileConfig : MulterOptions = {
    fileFilter: imageFileFilter,
    storage: diskStorage({
        destination: "./assets/images",
        filename: editFileName,
    })
}
