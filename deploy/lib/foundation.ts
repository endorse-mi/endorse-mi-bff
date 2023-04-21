import { CfnAuthorizer, Cors, EndpointType, Resource, RestApi, SecurityPolicy } from 'aws-cdk-lib/aws-apigateway';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { ARecord, HostedZone, IHostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { ApiGateway } from 'aws-cdk-lib/aws-route53-targets';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';

export class Foundation {
  readonly apexDomain = 'koala-techs.com';
  readonly endorseMiDomain = `endorse-mi.${this.apexDomain}`;
  readonly apiDomain = `api.${this.endorseMiDomain}`;
  readonly api: RestApi;
  readonly restResource: Resource;
  readonly authResource: Resource;
  readonly graphqlResource: Resource;
  readonly apiGateway: ApiGateway;
  readonly zone: IHostedZone;
  readonly aliasRecord: ARecord;

  readonly userPoolArn: string;
  readonly cognitoAuthorizer: CfnAuthorizer;

  constructor(scope: Construct) {
    this.userPoolArn = StringParameter.valueForStringParameter(scope, '/prod/infrastructure/user/cognito-user-pool-arn');

    this.api = new RestApi(scope, 'rest-api', {
      restApiName: 'endorse-mi-api-prod',
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
      },
      domainName: {
        // The custom domain name for the API.
        domainName: this.apiDomain,
        // Determines where requests to the custom domain name will be routed to.
        // Here the requests will be routed to an endpoint at the edge location closest to the client.
        endpointType: EndpointType.EDGE,
        certificate: Certificate.fromCertificateArn(
          scope,
          'api-cert',
          'arn:aws:acm:us-east-1:223889111609:certificate/5ef81e63-5323-47da-8732-852fb899d1df'
        ),
        securityPolicy: SecurityPolicy.TLS_1_2,
      },
      // Determines where the REST API will accept requests from.
      // For example, if you set endpointConfiguration.types to [EndpointType.REGIONAL, EndpointType.EDGE],
      // your REST API would accept requests at both the regional endpoint and the edge endpoint closest to the client.
      endpointConfiguration: {
        types: [EndpointType.REGIONAL],
      },
      deployOptions: {
        stageName: 'prod',
        tracingEnabled: true,
      },
    });

    this.restResource = this.api.root.addResource('rest');
    this.authResource = this.restResource.addResource('auth');
    this.graphqlResource = this.api.root.addResource('graphql');

    this.cognitoAuthorizer = new CfnAuthorizer(scope, 'cognito-authorizer', {
      name: 'endorse-mi-cognito-authorizer-prod',
      restApiId: this.api.restApiId,
      identitySource: 'method.request.header.Authorization',
      type: 'COGNITO_USER_POOLS',
      providerArns: [this.userPoolArn],
    });

    this.zone = HostedZone.fromLookup(scope, 'hosted-zone', {
      domainName: 'koala-techs.com',
    });

    this.apiGateway = new ApiGateway(this.api);

    this.aliasRecord = new ARecord(scope, 'route-to-api-gateway', {
      target: RecordTarget.fromAlias(this.apiGateway),
      recordName: this.apiDomain,
      zone: this.zone,
    });
  }
}
