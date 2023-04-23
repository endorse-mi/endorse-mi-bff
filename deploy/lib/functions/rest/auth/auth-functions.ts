import { RequestValidator } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import { Foundation } from '../../../foundation';
import addConfirmSignInEndpoint from './confirm-sign-up-function';
import addForgotPasswordEndpoint from './forgot-password-function';
import addForgotPasswordSubmitEndpoint from './forgot-password-submit-function';
import addSignInEndpoint from './sign-in-function';
import addSignUpEndpoint from './sign-up-function';

export class AuthFunctions {
  constructor(scope: Construct, foundation: Foundation) {
    const requestValidator = new RequestValidator(scope, 'auth-request-validator', {
      restApi: foundation.api,
      requestValidatorName: 'auth-request-validator',
      validateRequestBody: true,
      validateRequestParameters: true,
    });

    addSignInEndpoint(scope, foundation, requestValidator);
    addSignUpEndpoint(scope, foundation, requestValidator);
    addConfirmSignInEndpoint(scope, foundation, requestValidator);
    addForgotPasswordEndpoint(scope, foundation, requestValidator);
    addForgotPasswordSubmitEndpoint(scope, foundation, requestValidator);
  }
}
