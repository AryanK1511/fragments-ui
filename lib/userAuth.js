import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';

// Get the authenticated user's info
export const getUser = async () => {
  try {
    // Get current authenticated user
    const { username, userId } = await getCurrentUser();

    // Get tokens
    const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};

    // Return user object with tokens and authorization headers
    return {
      username,
      idToken,
      accessToken,
      getAuthorizationHeaders: () => {
        return {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken.toString()}`,
        };
      },
    };
  } catch (err) {
    console.error('Error fetching user:', err);
    return null; // Return null if an error occurs
  }
};
