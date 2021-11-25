import { Test, TestingModule } from '@nestjs/testing';
import { MedicalProcedureAuthorizationController } from './medical-procedure-authorization.controller';

describe('MedicalProcedureAuthorizationController', () => {
  let controller: MedicalProcedureAuthorizationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalProcedureAuthorizationController],
    }).compile();

    controller = module.get<MedicalProcedureAuthorizationController>(MedicalProcedureAuthorizationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
