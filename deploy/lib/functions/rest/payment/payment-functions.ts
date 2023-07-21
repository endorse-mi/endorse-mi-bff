import { Construct } from 'constructs';
import { Foundation } from '../../../foundation';
import addStripWebhookEndpoint from './stripe-webhook';

export class PaymentFunctions {
  constructor(scope: Construct, foundation: Foundation) {
    addStripWebhookEndpoint(scope, foundation);
  }
}
