#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { ENVIRONMENT } from '../lib/config';
import { EndorseMiBffStack } from '../lib/endorse-mi-bff-stack';

const app = new cdk.App();

new EndorseMiBffStack(app, `endorse-mi-bff-stack-${ENVIRONMENT}`, {
  env: { account: '223889111609', region: 'us-east-1' },
});
