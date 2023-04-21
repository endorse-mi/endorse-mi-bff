import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Foundation } from './foundation';
import { GraphqlFunction } from './functions/graphql/graphql-function';
import { AuthFunctions } from './functions/rest/auth/auth-functions';

export class EndorseMiBffStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const foundation = new Foundation(this);
    new GraphqlFunction(this, foundation);
    new AuthFunctions(this, foundation);
  }
}
