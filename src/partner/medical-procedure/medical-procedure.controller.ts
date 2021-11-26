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

@Controller('partner-medical-procedure')
export class MedicalProcedureController {
  private readonly logger = new Logger(MedicalProcedureController.name);

  constructor(
    @Inject('GISA_PARTNER_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  // async onApplicationBootstrap() {
  //   await this.client.connect();
  // }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async all() {
    return await this.client.send<string>({ cmd: 'medical-procedure.all' }, {});
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(@Body() payload: any) {
    return await this.client.send<string>(
      { cmd: 'medical-procedure.create' },
      payload,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async info(@Param() param: any) {
    this.logger.log('-');
  }
}
