import { Test, TestingModule } from '@nestjs/testing';
import { MlOcrController } from './ml-ocr.controller';

describe('MlOcrController', () => {
  let controller: MlOcrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MlOcrController],
    }).compile();

    controller = module.get<MlOcrController>(MlOcrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
