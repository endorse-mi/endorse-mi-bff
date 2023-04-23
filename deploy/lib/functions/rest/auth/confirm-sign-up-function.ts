import { AuthorizationType, JsonSchemaType, JsonSchemaVersion, LambdaIntegration, RequestValidator } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { Foundation } from '../../../foundation';
import { functionPropsFor } from '../../../helpers/function-props';

export default function addConfirmSignInEndpoint(scope: Construct, foundation: Foundation, requestValidator: RequestValidator) {
  const lambda = new NodejsFunction(
    scope,
    'endorse-mi-bff-confirm-sign-up',
    functionPropsFor({
      name: 'endorse-mi-bff-confirm-sign-up-prod',
      description: 'Confirm sign up by sending the verification code',
      entry: 'rest/auth/confirm-sign-up.ts',
    })
  );

  const requestModel = foundation.api.addModel('confirm-sign-up-request', {
    contentType: 'application/json',
    schema: {
      schema: JsonSchemaVersion.DRAFT4,
      title: 'confirm-sign-up-request',
      properties: {
        username: { type: JsonSchemaType.STRING },
        code: { type: JsonSchemaType.STRING },
      },
      required: ['username', 'code'],
    },
  });

  foundation.authResource.addResource('confirm-sign-up').addMethod('POST', new LambdaIntegration(lambda), {
    authorizationType: AuthorizationType.NONE,
    requestValidator,
    requestModels: {
      'application/json': requestModel,
    },
  });
}
