import { getCurrentUser } from 'aws-amplify/auth';

// Get the authenticated user's info
export const getUser = async () => {
    try {
        const { username, userId } = await getCurrentUser();
        return { username, userId }
      } catch (err) {
        console.log(err);
      }
    
      try {
        const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
      } catch (err) {
        console.log(err);
      }
}