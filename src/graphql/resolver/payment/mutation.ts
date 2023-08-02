import { ENVIRONMENT, STRIPE_KEY, WEB_APP_URL } from '../../../environments';

const stripe = require('stripe')(STRIPE_KEY);

export const PRICE_IDS =
  ENVIRONMENT === 'dev'
    ? {
        price_1NacXqFCMh4P4xJlr6csjlKq: 1000,
        price_1NacZPFCMh4P4xJlCVeGp2PV: 5000,
      }
    : {
        price_1NacbRFCMh4P4xJlHixML4s7: 1000,
        price_1NacbRFCMh4P4xJlc2YSGysP: 5000,
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
