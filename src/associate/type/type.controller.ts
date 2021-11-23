import { Controller, Get, Inject, Logger, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Controller('associate/type')
export class TypeController {
  private readonly logger = new Logger(TypeController.name);

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
      { cmd: 'associate-type.all' },
      {},
    );
  }
}
