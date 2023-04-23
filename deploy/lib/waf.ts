import { CfnWebACL, CfnWebACLAssociation } from 'aws-cdk-lib/aws-wafv2';
import { Construct } from 'constructs';
import { Foundation } from './foundation';
import { rateLimitRuleFor } from './helpers/waf-rule';

export class Waf {
  constructor(scope: Construct, foundation: Foundation) {
    // if an IP address is sending more than 100 requests to the ApiGateway within 5 minutes,
    // it receives 403 Forbidden with the following response body.
    // {
    //     "message": "Forbidden"
    // }
    const rules = [
      rateLimitRuleFor({
        name: 'endorse-mi-bff-prod',
        priority: 1,
        limit: 100,
      }),
    ];

    const webAcl = new CfnWebACL(scope, 'endorse-mi-bff-waf-acl', {
      name: `endorse-mi-bff-waf-acl-prod`,
      scope: 'REGIONAL',
      defaultAction: {
        allow: {},
      },
      visibilityConfig: {
        metricName: `endorse-mi-bff-waf-acl-prod`,
        cloudWatchMetricsEnabled: true,
        sampledRequestsEnabled: true,
      },
      rules,
    });

    new CfnWebACLAssociation(scope, 'endorse-mi-bff-association', {
      resourceArn: `arn:aws:apigateway:us-east-1::/restapis/${foundation.api.restApiId}/stages/${foundation.api.deploymentStage.stageName}`,
      webAclArn: webAcl.attrArn,
    });
  }
}
