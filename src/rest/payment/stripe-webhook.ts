import { STRIPE_KEY, WEBHOOK_SECRET } from '../../environments';
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
      console.log(stripeEvent.data.object.metadata.userId);
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
