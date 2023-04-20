import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BffFunction } from './bff-function';
import { Foundation } from './foundation';

export class EndorseMiBffStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const foundation = new Foundation(this);
    new BffFunction(this, foundation);
  }
}
