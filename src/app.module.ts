import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { IdentityModule } from './identity/identity.module';
import { HealthModule } from './health/health.module';
import { AssociateModule } from './associate/associate.module';
import { PartnerModule } from './partner/partner.module';

@Module({
  imports: [
    AuthModule,
    HealthModule,
    IdentityModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    AssociateModule,
    PartnerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
