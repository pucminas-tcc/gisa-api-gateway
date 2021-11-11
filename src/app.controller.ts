import { Controller, Post, Inject, Body, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserInterfaces } from './interfaces/user.interfaces';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    @Inject('GLS_AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.authClient.connect();
  }

  @Post('/user/register')
  register(@Body() User: UserInterfaces) {
    this.logger.log(User);
    this.authClient
      .send<string>({ cmd: 'register' }, User)
      .subscribe((message) => console.log(message));
  }
}
