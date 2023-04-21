import { AuthorizationType, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { Foundation } from '../../../foundation';
import { functionPropsFor } from '../../../helpers/function-props';

export default function addForgotPasswordEndpoint(scope: Construct, foundation: Foundation) {
  const lambda = new NodejsFunction(
    scope,
    'endorse-mi-bff-forgot-password',
    functionPropsFor({ name: 'endorse-mi-bff-forgot-password', description: 'forgot password', entry: 'rest/auth/forgot-password.ts' })
  );

  foundation.authResource.addResource('forgot-password').addMethod('POST', new LambdaIntegration(lambda), {
    authorizationType: AuthorizationType.NONE,
  });
}
