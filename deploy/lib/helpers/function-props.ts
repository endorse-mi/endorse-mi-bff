import { Duration } from 'aws-cdk-lib';
import { Runtime, Tracing } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import * as path from 'path';
import { COGNITO_CLIENT_ID, COGNITO_POOL_ID, ENVIRONMENT } from '../config';

type FunctionProps = {
  name: string;
  description: string;
  entry: string;
  memorySize?: number;
};

export const functionPropsFor = ({ name, description, entry, memorySize = 512 }: FunctionProps): NodejsFunctionProps => {
  const projectRoot = path.join(__dirname, '../../../');

  return {
    functionName: name,
    description,
    projectRoot,
    entry: path.join(projectRoot, `src/${entry}`),
    handler: 'handler',
    depsLockFilePath: path.join(projectRoot, 'package.json'),
    timeout: Duration.seconds(30),
    memorySize,
    runtime: Runtime.NODEJS_18_X,
    tracing: Tracing.ACTIVE,
    logRetention: RetentionDays.ONE_MONTH,
    bundling: {
      minify: true,
      externalModules: ['aws-sdk'],
    },
    environment: {
      ENVIRONMENT,
      COGNITO_POOL_ID,
      COGNITO_CLIENT_ID,
    },
  };
};
