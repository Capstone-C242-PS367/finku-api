import {
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  // UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MlOcrService } from './ml-ocr.service';
// import { AuthGuard } from '../auth/auth.guard';

@Controller('predict')
export class MlOcrController {
  constructor(private readonly mlOcrService: MlOcrService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: 3 * 1024 * 1024,
        })
        .addFileTypeValidator({ fileType: 'pdf' })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    try {
      return this.mlOcrService.uploadFile(file);
    } catch (e) {
      throw new InternalServerErrorException(`Unexpected error: ${e.message}`);
    }
  }
}
