import {
  Controller,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import to from 'await-to-js';
import * as fs from 'fs';
import { ImgurClient } from 'imgur';
import { diskStorage } from 'multer';
import { I18nLang } from 'nestjs-i18n';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { BaseController } from 'src/common/base.controller';
import { editFileName, imageFileFilter } from 'src/common/file-upload.utils';

const client = new ImgurClient({
  clientId: process.env.IMGUR_CLIENT_ID,
  clientSecret: process.env.IMGUR_CLIENT_SECRET,
});

@Controller('uploads')
export class UploadsController {
  constructor(private checkController: BaseController) {}

  @Post('image')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadPicture(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @I18nLang() lang: string,
  ) {
    this.checkController.checkFileExist(!!file);

    let link;
    try {
      // upload imgur
      const [err, result]: [any, any] = await to(
        Promise.all([
          client.upload({
            image: fs.readFileSync(file.path, 'base64'),
            type: 'base64',
          }),
        ]),
      );
      if (err) {
        fs.unlinkSync(file.path);
        this.checkController.throwErrorSystem(err?.message);
      }

      fs.unlinkSync(file.path);
      link = result[0]?.data?.link;
    } catch (err) {
      fs.unlinkSync(file.path);
      this.checkController.throwErrorSystem(err?.message);
    }

    return {
      ...file,
      message: await this.checkController.i18n.translate(
        'messages.IMAGE.UPLOAD_SUCCESS',
        {
          lang,
        },
      ),
      link,
    };
  }
}
