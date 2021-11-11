import { HttpModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TerminusModule } from '@nestjs/terminus';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { HealthController } from './health/health.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'GLS_AUTH_SERVICE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('GLS_AUTH_SERVICE_ENDPOINT'),
            port: configService.get('GLS_AUTH_SERVICE_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    TerminusModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ConfigModule.forRoot({ cache: true }),
  ],
  controllers: [AppController, HealthController],
  providers: [],
})
export class AppModule {}
