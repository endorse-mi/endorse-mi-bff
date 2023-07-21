import { AuthorizationType, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { ENVIRONMENT } from '../../../config';
import { Foundation } from '../../../foundation';
import { functionPropsFor } from '../../../helpers/function-props';

export default function addStripWebhookEndpoint(scope: Construct, foundation: Foundation) {
  const lambda = new NodejsFunction(
    scope,
    'endorse-mi-bff-stripe-webhook',
    functionPropsFor({
      name: `endorse-mi-bff-stripe-webhook-${ENVIRONMENT}`,
      description: 'Stripe Webhook',
      entry: 'rest/payment/stripe-webhook.ts',
    })
  );

  foundation.restResource.addResource('stripe-webhook').addMethod('POST', new LambdaIntegration(lambda), {
    authorizationType: AuthorizationType.NONE,
  });
}
