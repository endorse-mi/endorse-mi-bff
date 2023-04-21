import { AuthorizationType, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { Foundation } from '../../foundation';
import { functionPropsFor } from '../../helpers/function-props';

export class GraphqlFunction {
  constructor(scope: Construct, foundation: Foundation) {
    const graphqlFunction = new NodejsFunction(
      scope,
      'graphql-function',
      functionPropsFor({ name: 'endorse-mi-bff-graphql-function-prod', description: '', entry: 'graphql/index.ts' })
    );

    graphqlFunction.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['dynamodb:GetItem', 'dynamodb:PutItem', 'dynamodb:UpdateItem', 'dynamodb:DeleteItem'],
        resources: [
          'arn:aws:dynamodb:us-east-1:223889111609:table/user-table-prod',
          'arn:aws:dynamodb:us-east-1:223889111609:table/post-table-prod',
          'arn:aws:dynamodb:us-east-1:223889111609:table/post-interaction-table-prod',
        ],
      })
    );

    foundation.graphqlResource.addMethod('POST', new LambdaIntegration(graphqlFunction), {
      authorizationType: AuthorizationType.NONE,
    });
  }
}
