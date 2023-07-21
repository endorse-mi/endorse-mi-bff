import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Foundation } from './foundation';
import { GraphqlFunction } from './functions/graphql/graphql-function';
import { AuthFunctions } from './functions/rest/auth/auth-functions';
import { PaymentFunctions } from './functions/rest/payment/payment-functions';
import { RestFunctions } from './functions/rest/rest-functions';
import { Waf } from './waf';

export class EndorseMiBffStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const foundation = new Foundation(this);
    new Waf(this, foundation);
    new GraphqlFunction(this, foundation);
    new RestFunctions(this, foundation);
    new AuthFunctions(this, foundation);
    new PaymentFunctions(this, foundation);
  }
}
