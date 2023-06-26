import { AuthorizationType, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { ENVIRONMENT } from '../../config';
import { Foundation } from '../../foundation';
import { functionPropsFor } from '../../helpers/function-props';

export default function addPreviewPostsEndpoint(scope: Construct, foundation: Foundation) {
  const lambda = new NodejsFunction(
    scope,
    'endorse-mi-bff-preview-posts',
    functionPropsFor({ name: `endorse-mi-bff-preview-posts-${ENVIRONMENT}`, description: 'Preview Posts', entry: 'rest/preview-posts.ts' })
  );

  lambda.addToRolePolicy(
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['dynamodb:Query', 'dynamodb:GetItem'],
      resources: [
        `arn:aws:dynamodb:us-east-1:223889111609:table/user-table-${ENVIRONMENT}`,
        `arn:aws:dynamodb:us-east-1:223889111609:table/post-table-${ENVIRONMENT}`,
        `arn:aws:dynamodb:us-east-1:223889111609:table/post-table-${ENVIRONMENT}/index/*`,
      ],
    })
  );

  foundation.restResource.addResource('preview-posts').addMethod('GET', new LambdaIntegration(lambda), {
    authorizationType: AuthorizationType.NONE,
  });
}
