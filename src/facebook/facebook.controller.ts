import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FacebookService } from './facebook.service';

@Controller('auth')
export class FacebookController {
  constructor(private readonly facebookService: FacebookService) {}

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth(@Req() req: any) {
    return req.user;
  }

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Req() req: any) {
    const user = req.user;
    const tokenizedUser =
      await this.facebookService.validateUserByFacebookLogin(user);
    return tokenizedUser;
  }
}
