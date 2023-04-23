import { AuthorizationType, JsonSchemaType, JsonSchemaVersion, LambdaIntegration, RequestValidator } from 'aws-cdk-lib/aws-apigateway';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { Foundation } from '../../../foundation';
import { functionPropsFor } from '../../../helpers/function-props';

export default function addSignUpEndpoint(scope: Construct, foundation: Foundation, requestValidator: RequestValidator) {
  const lambda = new NodejsFunction(
    scope,
    'endorse-mi-bff-sign-up',
    functionPropsFor({ name: 'endorse-mi-bff-sign-up-prod', description: 'Sign up', entry: 'rest/auth/sign-up.ts' })
  );

  const requestModel = foundation.api.addModel('sign-up-request', {
    contentType: 'application/json',
    schema: {
      schema: JsonSchemaVersion.DRAFT4,
      title: 'sign-up-request',
      properties: {
        username: { type: JsonSchemaType.STRING },
        password: { type: JsonSchemaType.STRING },
        familyName: { type: JsonSchemaType.STRING },
        givenName: { type: JsonSchemaType.STRING },
        profile: { type: JsonSchemaType.STRING },
      },
      required: ['username', 'password', 'familyName', 'givenName', 'profile'],
    },
  });

  lambda.addToRolePolicy(
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['dynamodb:PutItem'],
      resources: ['arn:aws:dynamodb:us-east-1:223889111609:table/user-table-prod'],
    })
  );

  foundation.authResource.addResource('sign-up').addMethod('POST', new LambdaIntegration(lambda), {
    authorizationType: AuthorizationType.NONE,
    requestValidator,
    requestModels: {
      'application/json': requestModel,
    },
  });
}
