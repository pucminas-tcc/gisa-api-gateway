import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Controller('partner-medical-procedure-authorization')
export class MedicalProcedureAuthorizationController {
  private readonly logger = new Logger(
    MedicalProcedureAuthorizationController.name,
  );

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
    return await this.client.send<string>(
      { cmd: 'medical-procedure-authorization.all' },
      {},
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(@Body() payload: any) {
    return await this.client.send<string>(
      { cmd: 'medical-procedure-authorization.create' },
      payload,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(@Body() request: any, @Param() param: any) {
    const payload = {
      ...param,
      ...request,
    };
    return await this.client.send<string>(
      { cmd: 'medical-procedure-authorization.update' },
      payload,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async info(@Param() param: any) {
    this.logger.log('-');
  }
}
