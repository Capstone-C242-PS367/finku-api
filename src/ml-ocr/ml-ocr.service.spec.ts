import { Test, TestingModule } from '@nestjs/testing';
import { MlOcrService } from './ml-ocr.service';

describe('MlOcrService', () => {
  let service: MlOcrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MlOcrService],
    }).compile();

    service = module.get<MlOcrService>(MlOcrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
