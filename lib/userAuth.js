import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';

// Get the authenticated user's info
export const getUser = async () => {
  // Get current authenticated user
  const { username } = await getCurrentUser();

  // Get tokens
  const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};

  // Return user object with tokens and authorization headers
  return {
    username,
    idToken,
    accessToken,
    getAuthorizationHeaders: () => {
      return {
        Authorization: `Bearer ${idToken.toString()}`,
      };
    },
  };
};
