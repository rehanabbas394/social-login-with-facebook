import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(
  Strategy,
  'facebook',
) {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['emails', 'name', 'photos'],
    });
    console.log(
      'Facebook Callback URL:',
      process.env.FACEBOOK_APP_CALLBACK_URL,
    );
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any) => void,
  ) {
    try {
      const { name, emails, photos } = profile;
      const user = {
        email: emails?.[0]?.value ?? '',
        firstName: name?.givenName ?? '',
        lastName: name?.familyName ?? '',
        picture: photos?.[0]?.value ?? '',
        accessToken,
      };

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
}
