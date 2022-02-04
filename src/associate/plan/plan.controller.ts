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
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
@ApiTags('associate')
@Controller('associate-plan')
export class PlanController {
  private readonly logger = new Logger(PlanController.name);

  constructor(
    @Inject('GISA_ASSOCIATE_SERVICE')
    private readonly associateClient: ClientProxy,
  ) { }

  async onApplicationBootstrap() {
    await this.associateClient.connect();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async plans() {
    return await this.associateClient.send<string>({ cmd: 'plan.all' }, {});
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async plan_info(@Param() param: any) {
    this.logger.log('-');
  }

  @UseGuards(JwtAuthGuard)
  @Post('/register')
  async register_plan_for_associate(@Body() request: any) {
    return this.associateClient.send<string>(
      { cmd: 'associate-plan-type.create' },
      request,
    );
  }
}
