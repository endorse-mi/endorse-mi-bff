import { AuthorizationType, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
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

  lambda.addToRolePolicy(
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['dynamodb:Query', 'dynamodb:GetItem', 'dynamodb:PutItem', 'dynamodb:UpdateItem', 'dynamodb:DeleteItem'],
      resources: [`arn:aws:dynamodb:us-east-1:223889111609:table/user-table-${ENVIRONMENT}`],
    })
  );

  foundation.paymentResource.addResource('stripe-webhook').addMethod('POST', new LambdaIntegration(lambda), {
    authorizationType: AuthorizationType.NONE,
  });
}
