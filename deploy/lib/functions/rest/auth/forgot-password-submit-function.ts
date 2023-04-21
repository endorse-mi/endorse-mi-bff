import { AuthorizationType, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { Foundation } from '../../../foundation';
import { functionPropsFor } from '../../../helpers/function-props';

export default function addForgotPasswordSubmitEndpoint(scope: Construct, foundation: Foundation) {
  const lambda = new NodejsFunction(
    scope,
    'endorse-mi-bff-forgot-password-submit',
    functionPropsFor({
      name: 'endorse-mi-bff-forgot-password-submit',
      description: 'forgot password submit',
      entry: 'rest/auth/forgot-password-submit.ts',
    })
  );

  foundation.authResource.addResource('forgot-password-submit').addMethod('POST', new LambdaIntegration(lambda), {
    authorizationType: AuthorizationType.NONE,
  });
}
