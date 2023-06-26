# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `yarn build` compile typescript to js
- `yarn watch` watch for changes and compile
- `yarn test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

```bash
export AWS_ACCOUNT_ID=223889111609
export AWS_REGION=us-east-1
```

## Local Deployment

```
export ENVIRONMENT=dev
export CERTIFICATE_ARN=arn:aws:acm:us-east-1:223889111609:certificate/a7df4bf9-42ba-40d3-a273-cbe16c18acd1
export COGNITO_POOL_ID=us-east-1_ZJ4C1f0j0
export COGNITO_CLIENT_ID=1ftkehm42cim9ulp92gkqhek50
cdk diff
cdk deploy
```
