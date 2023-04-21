import { AuthorizationType, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { Foundation } from '../../../foundation';
import { functionPropsFor } from '../../../helpers/function-props';

export default function addSignUpEndpoint(scope: Construct, foundation: Foundation) {
  const lambda = new NodejsFunction(
    scope,
    'endorse-mi-bff-sign-up',
    functionPropsFor({ name: 'endorse-mi-bff-sign-up', description: 'sign up', entry: 'rest/auth/sign-up.ts' })
  );

  lambda.addToRolePolicy(
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['dynamodb:PutItem'],
      resources: ['arn:aws:dynamodb:us-east-1:223889111609:table/user-table-prod'],
    })
  );

  foundation.authResource.addResource('sign-up').addMethod('POST', new LambdaIntegration(lambda), {
    authorizationType: AuthorizationType.NONE,
  });
}
