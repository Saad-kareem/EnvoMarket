// src/stripe/stripe.module.ts
import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { OrderModule } from 'src/order/order.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [OrderModule, MailModule],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
