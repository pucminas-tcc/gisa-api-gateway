import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MedicalProcedureAuthorizationController } from './medical-procedure-authorization/medical-procedure-authorization.controller';
import { MedicalProcedureController } from './medical-procedure/medical-procedure.controller';
import { InstitutionTypeController } from './institution-type/institution-type.controller';
import { InstitutionController } from './institution/institution.controller';
import { AssociateRecordController } from './associate-record/associate-record.controller';

@Module({
  imports: [ConfigModule.forRoot({ cache: true })],
  providers: [
    {
      provide: 'GISA_PARTNER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>(
          'GISA_PARTNER_SERVICE_HOST',
          '127.0.0.1',
        );
        const port = configService.get<string>('GISA_PARTNER_SERVICE_PORT');

        return ClientProxyFactory.create({
          options: {
            transport: Transport.TCP,
            host,
            port,
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  controllers: [
    MedicalProcedureAuthorizationController,
    MedicalProcedureController,
    InstitutionTypeController,
    InstitutionController,
    AssociateRecordController,
  ],
})
export class PartnerModule {}
