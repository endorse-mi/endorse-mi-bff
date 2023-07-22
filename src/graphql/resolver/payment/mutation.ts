import { STRIPE_KEY, WEB_APP_URL } from '../../../environments';

const stripe = require('stripe')(STRIPE_KEY);

export const PRICE_IDS = {
  price_1NWE0QFCMh4P4xJl0iPbPLHf: 1000,
  price_1NWE3nFCMh4P4xJlSu4y47Yi: 5000,
  price_1NWE3nFCMh4P4xJlXHa9QgfX: 15000,
};

export const createCheckoutSession = async (parent, { priceId }: { priceId: string }, context) => {
  if (!(priceId in PRICE_IDS)) {
    throw new Error(`Price ID ${priceId} doesn't exist`);
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    metadata: {
      userId: context.userId,
      priceId,
    },
    mode: 'payment',
    success_url: `${WEB_APP_URL}/store?status=success`,
    cancel_url: `${WEB_APP_URL}/store?status=fail`,
  });

  return session.url;
};
