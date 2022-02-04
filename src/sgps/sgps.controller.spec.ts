import { Test, TestingModule } from '@nestjs/testing';
import { SgpsController } from './sgps.controller';

describe('SgpsController', () => {
  let controller: SgpsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SgpsController],
    }).compile();

    controller = module.get<SgpsController>(SgpsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
