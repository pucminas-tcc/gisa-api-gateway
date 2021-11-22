import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ cache: true }),
  ],
  controllers: [AuthController],
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
    AuthService,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
