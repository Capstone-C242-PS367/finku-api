import { Module } from '@nestjs/common';
import { MlOcrService } from './ml-ocr.service';
import { MlOcrController } from './ml-ocr.controller';

@Module({
  providers: [MlOcrService],
  controllers: [MlOcrController],
})
export class MlOcrModule {}
