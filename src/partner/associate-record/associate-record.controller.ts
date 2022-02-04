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
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
@ApiTags('partner')
@Controller('partner-associate-record')
export class AssociateRecordController {
  private readonly logger = new Logger(AssociateRecordController.name);

  constructor(
    @Inject('GISA_PARTNER_SERVICE')
    private readonly client: ClientProxy,
  ) { }

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async all() {
    return await this.client.send<string>({ cmd: 'associate-record.all' }, {});
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(@Body() payload: any) {
    return await this.client.send<string>(
      { cmd: 'associate-record.create' },
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
      { cmd: 'associate-record.update' },
      payload,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async plan_info(@Param() param: any) {
    this.logger.log('-');
  }
}
