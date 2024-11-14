import { Module } from '@nestjs/common';
import { MlOcrService } from './ml-ocr.service';

@Module({
  providers: [MlOcrService]
})
export class MlOcrModule {}
