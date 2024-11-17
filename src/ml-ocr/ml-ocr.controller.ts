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
import { ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { FileUploadDto } from './dto/upload-pdf.dto';
// import { AuthGuard } from '../auth/auth.guard';

@Controller('predict')
export class MlOcrController {
  constructor(private readonly mlOcrService: MlOcrService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    type: FileUploadDto,
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'Successfully performed OCR.',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'success',
        },
        message: {
          type: 'string',
          example: 'Berhasil melakukan ocr',
        },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              amount: {
                type: 'number',
                example: 61424,
              },
              type: {
                type: 'string',
                example: 'CR',
              },
              category: {
                type: 'string',
                example: 'Listrik',
              },
              name: {
                type: 'string',
                example: 'ayam geprek',
              },
              currency: {
                type: 'string',
                example: 'IDR',
              },
              date: {
                type: 'string',
                format: 'date-time',
                example: '2024-11-16T12:00:07.332Z',
              },
            },
          },
          example: [
            {
              amount: 61424,
              type: 'CR',
              category: 'Listrik',
              name: 'ayam geprek',
              currency: 'IDR',
              date: '2024-11-16T12:00:07.332Z',
            },
            {
              amount: 45000,
              type: 'DB',
              category: 'Makanan',
              name: 'nasi goreng',
              currency: 'IDR',
              date: '2024-11-16T15:00:00.000Z',
            },
          ],
        },
      },
    },
  })
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: 3 * 1024 * 1024,
        })
        .addFileTypeValidator({ fileType: /jpeg|jpg|png/ }) // Accept only image files
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
