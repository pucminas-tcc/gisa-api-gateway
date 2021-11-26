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

@Controller('associate-reimbursement')
export class ReimbursementController {
  private readonly logger = new Logger(ReimbursementController.name);

  constructor(
    @Inject('GISA_ASSOCIATE_SERVICE')
    private readonly associateClient: ClientProxy,
  ) {}

  // async onApplicationBootstrap() {
  //   await this.associateClient.connect();
  // }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async all() {
    return await this.associateClient.send<string>(
      { cmd: 'reimbursement.all' },
      {},
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(@Body() request: any) {
    return await this.associateClient.send<string>(
      { cmd: 'reimbursement.create' },
      request,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(@Body() request: any, @Param() param) {
    const payload = {
      ...request,
      ...param,
    };
    return await this.associateClient.send<string>(
      { cmd: 'reimbursement.update' },
      payload,
    );
  }
}
