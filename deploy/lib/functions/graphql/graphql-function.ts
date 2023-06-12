import { AuthorizationType, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { ENVIRONMENT } from '../../config';
import { Foundation } from '../../foundation';
import { functionPropsFor } from '../../helpers/function-props';

export class GraphqlFunction {
  constructor(scope: Construct, foundation: Foundation) {
    const graphqlFunction = new NodejsFunction(
      scope,
      'graphql-function',
      functionPropsFor({ name: `endorse-mi-bff-graphql-${ENVIRONMENT}`, description: '', entry: 'graphql/index.ts' })
    );

    graphqlFunction.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['dynamodb:GetItem', 'dynamodb:PutItem', 'dynamodb:UpdateItem', 'dynamodb:DeleteItem'],
        resources: [
          `arn:aws:dynamodb:us-east-1:223889111609:table/user-table-${ENVIRONMENT}`,
          `arn:aws:dynamodb:us-east-1:223889111609:table/post-table-${ENVIRONMENT}`,
          `arn:aws:dynamodb:us-east-1:223889111609:table/post-interaction-table-${ENVIRONMENT}`,
        ],
      })
    );

    foundation.graphqlResource.addMethod('POST', new LambdaIntegration(graphqlFunction), {
      authorizationType: AuthorizationType.COGNITO,
      authorizer: { authorizerId: foundation.cognitoAuthorizer.ref },
    });
  }
}
