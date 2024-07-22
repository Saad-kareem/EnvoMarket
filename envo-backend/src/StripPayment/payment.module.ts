import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { OrderModule } from 'src/order/order.module';
import { MailModule } from 'src/mail/mail.module';
import { PaymentController } from './payment.controller';

@Module({
  imports: [OrderModule, MailModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class StripeModule {}
