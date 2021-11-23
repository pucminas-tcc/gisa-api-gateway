import { Controller, Get, Inject, Logger, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Controller('associate/reimbursement')
export class ReimbursementController {
  private readonly logger = new Logger(ReimbursementController.name);

  constructor(
    @Inject('GISA_ASSOCIATE_SERVICE')
    private readonly associateClient: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.associateClient.connect();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async types() {
    return await this.associateClient.send<string>(
      { cmd: 'reimbursement.all' },
      {},
    );
  }
}
