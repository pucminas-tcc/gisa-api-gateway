import { Test, TestingModule } from '@nestjs/testing';
import { PlanTypeController } from './plan-type.controller';

describe('PlanTypeController', () => {
  let controller: PlanTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanTypeController],
    }).compile();

    controller = module.get<PlanTypeController>(PlanTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
