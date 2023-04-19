import { signUp } from '../../service/user/auth';

export interface SignUpRequest {
  username: string;
  password: string;
  familyName: string;
  givenName: string;
  profile: string;
}

export const handler = async (request) => {
  const signUpRequest: SignUpRequest = JSON.parse(request.body);

  try {
    const user = await signUp(signUpRequest);
    console.log(user);
    return {
      success: true,
      message: `Signed up user ${signUpRequest.username}`,
      user: {
        username: user.getUsername(),
      },
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};
