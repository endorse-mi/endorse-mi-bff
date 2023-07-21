import { STRIPE_KEY, WEBHOOK_SECRET } from '../../environments';

const stripe = require('stripe')(STRIPE_KEY);

exports.handler = async function (event) {
  const sig = event?.headers['Stripe-Signature'];
  const stripeEvent = stripe.webhooks.constructEvent(event.body, sig, WEBHOOK_SECRET);
  const eventType = stripeEvent.type;
  const jsonData = JSON.parse(event.body);

  console.log(`Event Type: ${eventType}`);
  console.log(jsonData);
  console.log(stripeEvent);

  const subscriptionId = stripeEvent.data.object.id;
  const customerId = stripeEvent.data.object.customer;
  const priceId = stripeEvent.data.object.plan?.id;

  let customerEmail;
  customerEmail = stripeEvent.data.object['customer_details']?.email;

  switch (eventType) {
    case 'checkout.session.completed':
      console.log('checkout.session.completed');
      break;
    case 'checkout.session.async_payment_succeeded':
      console.log('checkout.session.async_payment_succeeded');
      break;
    case 'checkout.session.async_payment_failed':
      console.log('checkout.session.async_payment_failed');
    default:
      console.log('Unhandled event type');
      console.log(stripeEvent.data.object);
      break;
  }
};
