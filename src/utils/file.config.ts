import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { extname } from "path";
import { diskStorage } from 'multer'
import { createParamDecorator, ExecutionContext } from "@nestjs/common";


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

const editPathFile = (req, file, callback) => {
    console.log(file);
    return "";
};

export const imageFileConfig : MulterOptions = {
    preservePath: true,
    fileFilter: imageFileFilter,
    storage: diskStorage({
        destination: "./public/images",
        filename: editFileName,
        path: editPathFile,
    })
}

export const FileUrl = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      const file = request.file;
      if(file) {
        return `${process.env.HOST}${file.path}`;
      }
      return "";
    },
);
