import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('upload')
export class UploadController {


    constructor() { }

    @Post('/images')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './images',
            filename: (req, file, callback) => {
                const uniqueSuffix =
                    Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                const filename = `${file.originalname}-${uniqueSuffix}${ext}`
                callback(null, filename)
            }
        })
    }))
    async uploadImage(@UploadedFile() image: Express.Multer.File): Promise<{ image: string }> {
        return { image: image.path }
    }

}
