import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@ApiTags('associate')
@Controller('associate')
export class AssociateController {
  private readonly logger = new Logger(AssociateController.name);

  constructor(
    @Inject('GISA_ASSOCIATE_SERVICE')
    private readonly associateClient: ClientProxy,
  ) { }

  async onApplicationBootstrap() {
    await this.associateClient.connect();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async associates() {
    return await this.associateClient.send<string>(
      { cmd: 'associate.all' },
      {},
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get("/is-active")
  async associate_is_active(@Body() body: any) {
    return await this.associateClient.send<string>(
      { cmd: 'associate.is-active' },
      body,
    )
  }

}
