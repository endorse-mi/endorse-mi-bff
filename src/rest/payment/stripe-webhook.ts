import { STRIPE_KEY, WEBHOOK_SECRET } from '../../environments';
import { PRICE_IDS } from '../../graphql/resolver/payment/mutation';
import balanceService from '../../service/balance-service';
import { commonResponseFor } from '../utils/common';

const stripe = require('stripe')(STRIPE_KEY);

exports.handler = async function (event) {
  const sig = event?.headers['Stripe-Signature'];
  console.log(STRIPE_KEY, WEBHOOK_SECRET);
  console.log({ event });
  console.log({ sig });
  const stripeEvent = stripe.webhooks.constructEvent(event.body, sig, WEBHOOK_SECRET);
  const eventType = stripeEvent.type;
  const jsonData = JSON.parse(event.body);

  console.log(`Event Type: ${eventType}`);
  console.log(stripeEvent);
  console.log(jsonData);

  switch (eventType) {
    case 'checkout.session.completed':
      console.log('checkout.session.completed');
      // TODO
      const userId = stripeEvent.data.object.metadata.userId;
      const priceId = stripeEvent.data.object.metadata.priceId;
      await balanceService.changeUserBalance(userId, PRICE_IDS[priceId]);
      break;
    case 'checkout.session.async_payment_succeeded':
      console.log('checkout.session.async_payment_succeeded');
      break;
    case 'checkout.session.async_payment_failed':
      console.log('checkout.session.async_payment_failed');
      break;
    default:
      console.log('Unhandled event type');
      return commonResponseFor({
        statusCode: 403,
        body: {
          success: false,
          message: 'Unhandled event type',
        },
      });
  }

  return commonResponseFor({
    statusCode: 200,
    body: {
      success: true,
      message: 'Webhook has been invoked successfully',
    },
  });
};
