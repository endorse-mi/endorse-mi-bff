import { CfnWebACL } from 'aws-cdk-lib/aws-wafv2';

type RateLimitRuleProps = {
  name: string;
  priority: number;
  limit: number;
  uriPath?: string;
};

export const rateLimitRuleFor = ({ name, priority, limit, uriPath }: RateLimitRuleProps): CfnWebACL.RuleProperty => ({
  name: `${name}-prod-rate-limit`,
  priority,
  action: {
    block: {},
  },
  visibilityConfig: {
    metricName: `${name}-prod-rate-limit`,
    cloudWatchMetricsEnabled: true,
    sampledRequestsEnabled: true,
  },
  statement: {
    rateBasedStatement: {
      aggregateKeyType: 'IP',
      limit,
      ...(uriPath
        ? {
            scopeDownStatement: {
              byteMatchStatement: {
                positionalConstraint: 'EXACTLY',
                textTransformations: [
                  {
                    priority: 0,
                    type: 'LOWERCASE',
                  },
                ],
                searchString: uriPath,
                fieldToMatch: {
                  uriPath: {},
                },
              },
            },
          }
        : {}),
    },
  },
});
