import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: [
        'profile',
        'email',
        'https://www.googleapis.com/auth/user.birthday.read',
        'https://www.googleapis.com/auth/calendar',
      ],
      access_type: 'offline',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    done(null, {
      first_name: profile.given_name,
      last_name: profile.family_name,
      email: profile.email.toLowerCase(),
      accessToken,
    });
  }
}
