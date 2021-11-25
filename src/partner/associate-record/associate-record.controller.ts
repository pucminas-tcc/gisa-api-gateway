import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Controller('partner/associate-record')
export class AssociateRecordController {
  private readonly logger = new Logger(AssociateRecordController.name);

  constructor(
    @Inject('GISA_PARTNER_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async all() {
    return await this.client.send<string>({ cmd: 'associate-record.all' }, {});
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async plan_info(@Param() param: any) {
    this.logger.log('-');
  }
}
