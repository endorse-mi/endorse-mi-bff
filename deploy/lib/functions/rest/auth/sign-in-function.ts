import { AuthorizationType, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { Foundation } from '../../../foundation';
import { functionPropsFor } from '../../../helpers/function-props';

export default function addSignInEndpoint(scope: Construct, foundation: Foundation) {
  const lambda = new NodejsFunction(
    scope,
    'endorse-mi-bff-sign-in',
    functionPropsFor({ name: 'endorse-mi-bff-sign-in', description: 'sign in', entry: 'rest/auth/sign-in.ts' })
  );

  foundation.authResource.addResource('sign-in').addMethod('POST', new LambdaIntegration(lambda), {
    authorizationType: AuthorizationType.NONE,
  });
}
