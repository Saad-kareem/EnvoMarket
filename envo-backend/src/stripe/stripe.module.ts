// src/stripe/stripe.module.ts
import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [OrderModule],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
