import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AssociateController } from './associate.controller';
import { PlanController } from './plan/plan.controller';
import { TypeController } from './type/type.controller';
import { ReimbursementController } from './reimbursement/reimbursement.controller';

@Module({
  imports: [ConfigModule.forRoot({ cache: true })],
  controllers: [
    AssociateController,
    PlanController,
    TypeController,
    ReimbursementController,
  ],
  providers: [
    {
      provide: 'GISA_ASSOCIATE_SERVICE',
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>(
          'GISA_ASSOCIATE_SERVICE_HOST',
          '127.0.0.1',
        );
        const port = configService.get<string>('GISA_ASSOCIATE_SERVICE_PORT');

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
})
export class AssociateModule {}
