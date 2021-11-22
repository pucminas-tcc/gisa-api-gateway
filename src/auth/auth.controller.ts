import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    @Inject('GISA_IDENTITY_SERVICE')
    private readonly identityClient: ClientProxy,
    private readonly authService: AuthService,
  ) {}

  @Post('/authenticate')
  async authenticate(@Body() request: any) {
    this.logger.log(request);

    const isAccount = await this.identityClient
      .send<string>({ cmd: 'validate' }, request)
      .toPromise();

    if (isAccount) {
      return await this.authService.login(request);
    }

    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}
