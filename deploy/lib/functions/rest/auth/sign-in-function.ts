import { AuthorizationType, JsonSchemaType, JsonSchemaVersion, LambdaIntegration, RequestValidator } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { ENVIRONMENT } from '../../../config';
import { Foundation } from '../../../foundation';
import { functionPropsFor } from '../../../helpers/function-props';

export default function addSignInEndpoint(scope: Construct, foundation: Foundation, requestValidator: RequestValidator) {
  const lambda = new NodejsFunction(
    scope,
    'endorse-mi-bff-sign-in',
    functionPropsFor({ name: `endorse-mi-bff-sign-in-${ENVIRONMENT}`, description: 'Sign in', entry: 'rest/auth/sign-in.ts' })
  );

  const requestModel = foundation.api.addModel('sign-in-request', {
    contentType: 'application/json',
    schema: {
      schema: JsonSchemaVersion.DRAFT4,
      title: 'sign-in-request',
      properties: {
        username: { type: JsonSchemaType.STRING },
        password: { type: JsonSchemaType.STRING },
      },
      required: ['username', 'password'],
    },
  });

  foundation.authResource.addResource('sign-in').addMethod('POST', new LambdaIntegration(lambda), {
    authorizationType: AuthorizationType.NONE,
    requestValidator,
    requestModels: {
      'application/json': requestModel,
    },
  });
}
