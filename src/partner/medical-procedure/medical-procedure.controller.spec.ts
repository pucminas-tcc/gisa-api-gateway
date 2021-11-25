import { Test, TestingModule } from '@nestjs/testing';
import { MedicalProcedureController } from './medical-procedure.controller';

describe('MedicalProcedureController', () => {
  let controller: MedicalProcedureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalProcedureController],
    }).compile();

    controller = module.get<MedicalProcedureController>(MedicalProcedureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
