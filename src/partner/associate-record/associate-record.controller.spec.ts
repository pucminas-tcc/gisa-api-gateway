import { Test, TestingModule } from '@nestjs/testing';
import { AssociateRecordController } from './associate-record.controller';

describe('AssociateRecordController', () => {
  let controller: AssociateRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociateRecordController],
    }).compile();

    controller = module.get<AssociateRecordController>(AssociateRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
