import { AuthorizationType, JsonSchemaType, JsonSchemaVersion, LambdaIntegration, RequestValidator } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { Foundation } from '../../../foundation';
import { functionPropsFor } from '../../../helpers/function-props';

export default function addForgotPasswordSubmitEndpoint(scope: Construct, foundation: Foundation, requestValidator: RequestValidator) {
  const lambda = new NodejsFunction(
    scope,
    'endorse-mi-bff-forgot-password-submit',
    functionPropsFor({
      name: 'endorse-mi-bff-forgot-password-submit-prod',
      description: 'Submit a new password',
      entry: 'rest/auth/forgot-password-submit.ts',
    })
  );

  const requestModel = foundation.api.addModel('forgot-password-submit-request', {
    contentType: 'application/json',
    schema: {
      schema: JsonSchemaVersion.DRAFT4,
      title: 'forgot-password-submit-request',
      properties: {
        username: { type: JsonSchemaType.STRING },
        password: { type: JsonSchemaType.STRING },
        code: { type: JsonSchemaType.STRING },
      },
      required: ['username', 'password', 'code'],
    },
  });

  foundation.authResource.addResource('forgot-password-submit').addMethod('POST', new LambdaIntegration(lambda), {
    authorizationType: AuthorizationType.NONE,
    requestValidator,
    requestModels: {
      'application/json': requestModel,
    },
  });
}
