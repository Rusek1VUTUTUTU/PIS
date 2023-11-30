import { BadRequestException, Body, Controller, Get, Post, Render, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  @Render('login')
  root() {
    return { };
  }

  @Get('login-code')
  @Render('login-code')
  loginCode() {
    return { };
  }


  @Post('login')
  public async login(@Req() req) {
    const user = this.appService.loginByEmailPassword(req.body.login, req.body.password)
    if (user) {
      return user
    } else {
      throw new BadRequestException("Wrong login or password")
    }
  }

  @Post('login-by-code')
  public async loginByCode(@Req() req) {
    const user = this.appService.loginByEmailPasswordCode(req.body.login, req.body.password)
    if (user) {
      return user
    } else {
      throw new BadRequestException("Wrong login or password")
    }
  }

  @Post('verify-code')
  public async verifyCode(@Req() req) {
    const user = this.appService.verifyEmailPasswordCode(req.body.email, req.body.password, req.body.code)
    if (user) {
      return user
    } else {
      throw new BadRequestException("Wrong login or password")
    }
  }
}
