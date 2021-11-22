import { ConfigService } from '@nestjs/config';

const configService: ConfigService = new ConfigService();

export const jwtSecretKey = configService.get<string>('JWT_SECRET_KEY');
