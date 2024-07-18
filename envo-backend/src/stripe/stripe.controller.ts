import { Controller, Post, Body, Req } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Request } from 'express';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-checkout-session')
  async createCheckoutSession(@Body() body: any) {
    const { cartItems, email } = body;
    const session = await this.stripeService.createCheckoutSession(
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
      event = this.stripeService
        .getStripeInstance()
        .webhooks.constructEvent(request.rawBody, sig, endpointSecret);
    } catch (err) {
      return `Webhook Error: ${err.message}`;
    }

    await this.stripeService.handleWebhook(event);
    return { received: true };
  }
}

