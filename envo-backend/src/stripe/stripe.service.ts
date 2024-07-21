import { Injectable, Logger } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { CheckoutService } from 'src/order/order.service';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private readonly logger = new Logger(StripeService.name);

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
    const validatedItems = cartItems
      .map((item) => {
        const unitAmount = Math.round(item.totalPrice * 100);
        if (isNaN(unitAmount) || unitAmount <= 0) {
          this.logger.error(`Invalid unit_amount for item: ${item.name}`);
          return null;
        }
        return {
          price_data: {
            currency: 'pkr',
            product_data: {
              name: item.name,
            },
            unit_amount: unitAmount,
          },
          quantity: item.quantity,
        };
      })
      .filter((item) => item !== null);

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: validatedItems,
      customer_email: email,
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });

    this.logger.log(`Created Stripe session: ${session.id}`);
    return session;
  }

  async handleWebhook(event: Stripe.Event) {
    this.logger.log(`Received webhook event: ${event.id}`);
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_email;

      try {
        await this.checkoutService.updatePaymentStatus(session.id, 'paid');
        this.logger.log(`Payment status updated in database: ${session.id}`);
      } catch (error) {
        this.logger.error(`Failed to update payment status: ${error.message}`);
        throw error;
      }

      if (email) {
        try {
          await this.mailService.sendMail(
            email,
            'Order Confirmation',
            'The payment is successful and your order has been placed successfully.',
            '<p>The payment is successful and your order has been placed successfully.</p>',
          );
          this.logger.log(`Order confirmation email sent to: ${email}`);
        } catch (error) {
          this.logger.error(
            `Failed to send email to ${email}: ${error.message}`,
          );
          throw error;
        }
      }
    } else {
      this.logger.error('Order ID not found in session metadata');
    }
  }

  public getStripeInstance(): Stripe {
    return this.stripe;
  }
}
