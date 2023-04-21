import { RequestValidator } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import { Foundation } from '../../../foundation';
import addConfirmSignInEndpoint from './confirm-sign-up-function';
import addForgotPasswordEndpoint from './forgot-password-function';
import addForgotPasswordSubmitEndpoint from './forgot-password-submit-function';
import addSignInEndpoint from './sign-in-function';
import addSignUpEndpoint from './sign-up-function';

export class AuthFunctions {
  private readonly scope: Construct;
  private readonly foundation: Foundation;
  private readonly requestValidator: RequestValidator;

  constructor(scope: Construct, foundation: Foundation) {
    this.scope = scope;
    this.foundation = foundation;
    this.requestValidator = new RequestValidator(scope, 'auth-request-validator', {
      restApi: foundation.api,
      requestValidatorName: 'auth-request-validator',
      validateRequestBody: true,
      validateRequestParameters: true,
    });

    addSignInEndpoint(scope, foundation);
    addSignUpEndpoint(scope, foundation);
    addConfirmSignInEndpoint(scope, foundation);
    addForgotPasswordEndpoint(scope, foundation);
    addForgotPasswordSubmitEndpoint(scope, foundation);
  }
}
