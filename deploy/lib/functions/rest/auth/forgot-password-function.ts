import { AuthorizationType, JsonSchemaType, JsonSchemaVersion, LambdaIntegration, RequestValidator } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { Foundation } from '../../../foundation';
import { functionPropsFor } from '../../../helpers/function-props';

export default function addForgotPasswordEndpoint(scope: Construct, foundation: Foundation, requestValidator: RequestValidator) {
  const lambda = new NodejsFunction(
    scope,
    'endorse-mi-bff-forgot-password',
    functionPropsFor({
      name: 'endorse-mi-bff-forgot-password-prod',
      description: 'Send a forgot password email to the user',
      entry: 'rest/auth/forgot-password.ts',
    })
  );

  const requestModel = foundation.api.addModel('forgot-password-request', {
    contentType: 'application/json',
    schema: {
      schema: JsonSchemaVersion.DRAFT4,
      title: 'forgot-password-request',
      properties: {
        username: { type: JsonSchemaType.STRING },
      },
      required: ['username'],
    },
  });

  foundation.authResource.addResource('forgot-password').addMethod('POST', new LambdaIntegration(lambda), {
    authorizationType: AuthorizationType.NONE,
    requestValidator,
    requestModels: {
      'application/json': requestModel,
    },
  });
}
