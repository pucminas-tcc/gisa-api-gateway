import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { IdentityController } from './identity.controller';

@Module({
  imports: [ConfigModule.forRoot({ cache: true })],
  controllers: [IdentityController],
  providers: [
    {
      provide: 'GISA_IDENTITY_SERVICE',
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>(
          'GISA_IDENTITY_SERVICE_HOST',
          '127.0.0.1',
        );
        const port = configService.get<string>('GISA_IDENTITY_SERVICE_PORT');

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
export class IdentityModule {}
