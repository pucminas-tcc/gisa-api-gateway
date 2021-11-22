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

@Controller('associate')
export class AssociateController {
  private readonly logger = new Logger(AssociateController.name);

  constructor(
    @Inject('GISA_ASSOCIATE_SERVICE')
    private readonly associateClient: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.associateClient.connect();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async associates() {
    return await this.associateClient.send<string>(
      { cmd: 'associate.all' },
      {},
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/plan')
  async plans() {
    return await this.associateClient.send<string>({ cmd: 'plan.all' }, {});
  }

  @UseGuards(JwtAuthGuard)
  @Post('/plan/register')
  async register_plan_for_associate(@Body() request: any) {
    return this.associateClient.send<string>(
      { cmd: 'associate-plan-type.create' },
      request,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/type')
  async types() {
    return await this.associateClient.send<string>(
      { cmd: 'associate-type.all' },
      {},
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async associate_info(@Param() param: any) {
    this.logger.log('.');
  }

  @UseGuards(JwtAuthGuard)
  @Get('/plan/:id')
  async plan_info(@Param() param: any) {
    this.logger.log('-');
  }
}
