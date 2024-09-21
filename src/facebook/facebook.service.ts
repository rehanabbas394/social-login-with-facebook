import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class FacebookService {
  constructor(private readonly usersService: UsersService) {}

  async validateUserByFacebookLogin(profile: any) {
    const { email, firstName, lastName, picture } = profile;
    const fullName = `${firstName} ${lastName}` || 'Unknown';

    let user = await this.usersService.findOneByEmail(email);
    if (user) {
      const token = this.usersService.createJwtToken(user);
      return {
        message: "FACEBOOK LOGIN SUCCESS MESSAGE",
        user,
        token,
      };
    }

    user = await this.usersService.create({
      firstName: fullName,
      email: email,
      profilePicture: picture,
    });

    const token = this.usersService.createJwtToken(user);
    return {
      message: "FACEBOOK Register SUCCESS MESSAGE",
      user,
      token,
    };
  }
}
