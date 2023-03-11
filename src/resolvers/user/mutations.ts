interface SignUpRequest {
  request: {
    username: string;
    password: string;
    familyName: string;
    givenName: string;
    profile: string;
  };
}

export const signUp = async (parent: any, { request }: SignUpRequest) => {
  console.log('Received request!');
  console.log(request);
};
