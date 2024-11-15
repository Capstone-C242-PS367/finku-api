import {
  Controller,
  InternalServerErrorException,
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
  // @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      return this.mlOcrService.uploadFile(file);
    } catch (e) {
      throw new InternalServerErrorException(`Unexpected error: ${e.message}`);
    }
  }
}
