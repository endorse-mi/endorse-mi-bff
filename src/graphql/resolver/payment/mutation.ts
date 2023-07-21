import { STRIPE_KEY, WEB_APP_URL } from '../../../environments';

const stripe = require('stripe')(STRIPE_KEY);

const PRICE_IDS = new Set(['price_1NWE0QFCMh4P4xJl0iPbPLHf', 'price_1NWE3nFCMh4P4xJlSu4y47Yi', 'price_1NWE3nFCMh4P4xJlXHa9QgfX']);

export const createCheckoutSession = async (parent, { priceId }: { priceId: string }, context) => {
  if (!PRICE_IDS.has(priceId)) {
    throw new Error(`Price ID ${priceId} doesn't exist`);
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${WEB_APP_URL}/store?status=success`,
    cancel_url: `${WEB_APP_URL}/store?status=fail`,
  });

  return session.url;
};
