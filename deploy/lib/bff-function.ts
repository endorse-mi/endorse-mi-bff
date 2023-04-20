import { Duration } from 'aws-cdk-lib';
import { AuthorizationType, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Runtime, Tracing } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { Foundation } from './foundation';
import path = require('path');

const functionPropsFor = (functionName: string, foundation: Foundation): NodejsFunctionProps => {
  const projectRoot = path.join(__dirname, '../..');
  return {
    functionName,
    projectRoot,
    entry: path.join(projectRoot, 'src/graphql/index.ts'),
    handler: 'handler',
    depsLockFilePath: path.join(projectRoot, 'package.json'),
    timeout: Duration.seconds(30),
    memorySize: 128,
    runtime: Runtime.NODEJS_18_X,
    tracing: Tracing.ACTIVE,
    logRetention: RetentionDays.ONE_MONTH,
    bundling: {
      minify: true,
      externalModules: ['aws-sdk'],
    },
  };
};

export class BffFunction {
  constructor(scope: Construct, foundation: Foundation) {
    const graphqlFunction = new NodejsFunction(
      scope,
      'graphql-function',
      functionPropsFor('endorse-mi-bff-graphql-function-prod', foundation)
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

    const graphqlResource = foundation.api.root.addResource('graphql');
    graphqlResource.addMethod('POST', new LambdaIntegration(graphqlFunction), {
      authorizationType: AuthorizationType.NONE,
    });
  }
}
