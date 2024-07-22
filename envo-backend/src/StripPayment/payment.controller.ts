import { Controller, Post, Body, Req } from '@nestjs/common';
import { Request } from 'express';
import { PaymentService } from './payment.service';

@Controller('stripe')
export class PaymentController {
  constructor(private readonly PaymentService: PaymentService) {}

  @Post('create-payment-session')
  async createCheckoutSession(@Body() body: any) {
    const { cartItems, email } = body;
    const session = await this.PaymentService.createCheckoutSession(
      cartItems,
      email,
    );
    console.log(session.id);
    return { id: session.id };
  }

  @Post('webhook')
  async handleWebhook(@Req() request: Request) {
    const sig = request.headers['stripe-signature'];
    const endpointSecret = 'whsec_KfYSarC9NmXKPom2wvWua2SZcx9Bxz4S';
    let event;
    try {
      event = this.PaymentService.getStripeInstance().webhooks.constructEvent(
        request.rawBody,
        sig,
        endpointSecret,
      );
    } catch (err) {
      return `Webhook Error: ${err.message}`;
    }

    await this.PaymentService.handleWebhook(event);
    return { received: true };
  }
}
