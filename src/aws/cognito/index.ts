import { type CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_t7v4IF9Z4',
  ClientId: '10trqqeek3pr7kmokan7uu9tgo',
};

export const userPool = new CognitoUserPool(poolData);

export interface SignUpAttributes {
  username: string;
  password: string;
  familyName: string;
  givenName: string;
  profile: string;
}

export const signUpCognitoUser = async ({
  username,
  password,
  familyName,
  givenName,
  profile,
}: SignUpAttributes): Promise<CognitoUser | undefined> => {
  const attributeList = [
    new CognitoUserAttribute({ Name: 'family_name', Value: familyName }),
    new CognitoUserAttribute({ Name: 'given_name', Value: givenName }),
    new CognitoUserAttribute({ Name: 'profile', Value: profile }),
  ];
  return await new Promise((resolve) => {
    userPool.signUp(username, password, attributeList, [], (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      const cognitoUser = result?.user;
      console.log('User signup successful!');
      resolve(cognitoUser);
    });
  });
};
