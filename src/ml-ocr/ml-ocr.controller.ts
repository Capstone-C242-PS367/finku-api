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
    description: 'Successfully performed OCR and calculated totals.',
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
          type: 'object',
          properties: {
            total_DB: {
              type: 'number',
              example: 93144,
            },
            total_CR: {
              type: 'number',
              example: 44236,
            },
            difference: {
              type: 'number',
              example: 48908,
            },
            result: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  amount: {
                    type: 'number',
                    example: 25531,
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
                    example: '2024-11-20T01:21:52.454Z',
                  },
                },
              },
            },
          },
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
