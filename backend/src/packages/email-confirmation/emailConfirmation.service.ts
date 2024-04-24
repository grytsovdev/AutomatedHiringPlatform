import { JwtService } from '@nestjs/jwt';
import { MailService } from 'packages/mail/mail.service';

import { BadRequestException, Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';

export class EmailConfirmationService {
  private readonly logger = new Logger(EmailConfirmationService.name);
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly userService: UserService,
  ) {}

  async sendVerificationLink(email: string) {
    const payload = { email: email };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
      expiresIn: process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME,
    });

    const url = `<a href = "${process.env.EMAIL_CONFIRMATION_URL}?token=${token}">Confirm email</a>`;

    const subject = 'Email confirmation';
    const content = `Welcome to Fyrst. To confirm the email address, click here: ${url}`;

    try {
      await this.mailService.sendEmail(email, subject, content);
      this.logger.log('Email confirmation link sent successfully.');
    } catch (error) {
      this.logger.error('Error sending email confirmation link:', error);
      throw new InternalServerErrorException('Failed to send email confirmation');
    }
  }

  async confirmEmail(token: string) {
    try {
      const decodedToken = this.jwtService.verify(token, {
        secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
      });
      const email = decodedToken.email;
      const user = await this.userService.findByEmail(email);

      if (user.is_confirmed) {
        throw new BadRequestException('Email is already confirmed');
      }

      this.logger.log('Email confirmed:', JSON.stringify(decodedToken));
      await this.userService.markEmailAsConfirmed(email);
      return true;
    } catch (error) {
      this.logger.error('Invalid token', error);
      return false;
    }
  }
}
