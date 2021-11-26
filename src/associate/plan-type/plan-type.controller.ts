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

@Controller('associate-plan-type')
export class PlanTypeController {
  private readonly logger = new Logger(PlanTypeController.name);

  constructor(
    @Inject('GISA_ASSOCIATE_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  // async onApplicationBootstrap() {
  //   await this.client.connect();
  // }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async all() {
    return await this.client.send<string>(
      { cmd: 'associate-plan-type.all' },
      {},
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async info(@Param() param: any) {
    return await this.client.send<string>(
      { cmd: 'associate-plan-type.list' },
      param,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(@Body() request: any) {
    return await this.client.send<string>(
      { cmd: 'associate-plan-type.create' },
      request,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(@Body() request: any, @Param() param: any) {
    const payload = { ...request, ...param };

    return await this.client.send<string>(
      { cmd: 'associate-plan-type.update' },
      payload,
    );
  }
}
