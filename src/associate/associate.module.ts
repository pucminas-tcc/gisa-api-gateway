import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AssociateController } from './associate.controller';

@Module({
  imports: [ConfigModule.forRoot({ cache: true })],
  controllers: [AssociateController],
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
