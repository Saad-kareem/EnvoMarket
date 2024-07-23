import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true, 
      auth: {
        user: 'saadkareem475@gmail.com',
        pass: 'mvnf xmig kzsz gfcc',
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html: string) {
    const info = await this.transporter.sendMail({
      from: 'saadkareem475@gmail.com',
      to,
      subject,
      text,
      html,
    });

    console.log('Message sent: %s', info.messageId);
  }
}
