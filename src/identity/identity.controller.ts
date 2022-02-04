import {
  Body,
  Controller,
  Delete,
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

@ApiTags('identity')
@Controller('identity')
export class IdentityController {
  private readonly logger = new Logger(IdentityController.name);

  constructor(
    @Inject('GISA_IDENTITY_SERVICE')
    private readonly identityClient: ClientProxy,
  ) { }

  async onApplicationBootstrap() {
    await this.identityClient.connect();
  }

  @Post('/')
  async register(@Body() request: any) {
    this.logger.log(request);

    return this.identityClient.send<string>({ cmd: 'account.create' }, request);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async identity_info(@Param() param: any) {
    this.logger.log(param);

    return this.identityClient.send<string>({ cmd: 'account.list' }, param);
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async identities() {
    this.logger.log('');

    return this.identityClient.send<string>({ cmd: 'account.all' }, {});
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param() param: any) {
    this.logger.log(param);

    return this.identityClient.send<string>({ cmd: 'account.remove' }, param);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async update(@Param() param: any, @Body() request: any) {
    const payload = {
      ...param,
      ...request,
    };
    return this.identityClient.send<string>({ cmd: 'account.update' }, payload);
  }
}
