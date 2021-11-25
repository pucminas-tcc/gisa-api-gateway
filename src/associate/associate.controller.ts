import {
  Controller,
  Get,
  Inject,
  Logger,
  Param,
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

  @UseGuards(JwtAuthGuard)
  @Get()
  async associates() {
    return await this.associateClient.send<string>(
      { cmd: 'associate.all' },
      {},
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async associate_info(@Param() param: any) {
    this.logger.log('.');
  }
}
