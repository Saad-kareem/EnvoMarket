import { Injectable } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { CheckoutService } from 'src/order/order.service';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private readonly checkoutService: CheckoutService,
    private readonly mailService: MailService,
  ) {
    this.stripe = new Stripe(
      'sk_test_51Nv06bHv7FnHz0YWmjqCSLVAloCUYE3J8roQ6aTioZWpzCUkFw2DjsRNhBG0PTEPhF5MrklBwUpDs0JIDteXItku00n0fnlFkp',
      {
        apiVersion: '2024-06-20',
      },
    );
  }
  async createCheckoutSession(cartItems: any[], email: string) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: 'pkr',
          product_data: {
            name: item.name,
          },
          unit_amount: item.totalPrice * 100, // Stripe uses the smallest currency unit
        },
        quantity: item.quantity,
      })),
      customer_email: email,
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });

    console.log(session, 'Session');

    return session;
  }
  async handleWebhook(event: Stripe.Event) {
    console.log(event);
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_email;
      // Update your database with payment status 'paid'
      await this.checkoutService.updatePaymentStatus(session.id, 'paid');

      console.log('Payment status updated in database:', session.id);
      console.log('webHook Session', session);
      if (email) {
        await this.mailService.sendMail(
          email,
          'Order Confirmation',
          'The payment is successful and your order has been placed successfully.',
          '<p>The payment is successful and your order has been placed successfully.</p>',
        );
      }
    } else {
      console.error('Order ID not found in session metadata');
    }
  }
  public getStripeInstance(): Stripe {
    return this.stripe;
  }
}
