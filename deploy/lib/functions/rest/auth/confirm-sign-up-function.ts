import { AuthorizationType, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { Foundation } from '../../../foundation';
import { functionPropsFor } from '../../../helpers/function-props';

export default function addConfirmSignInEndpoint(scope: Construct, foundation: Foundation) {
  const lambda = new NodejsFunction(
    scope,
    'endorse-mi-bff-confirm-sign-up',
    functionPropsFor({
      name: 'endorse-mi-bff-confirm-sign-up',
      description: 'Endorse Mi Bff confirm sign up function',
      entry: 'rest/auth/confirm-sign-up.ts',
    })
  );

  foundation.authResource.addResource('confirm-sign-up').addMethod('POST', new LambdaIntegration(lambda), {
    authorizationType: AuthorizationType.NONE,
  });
}
