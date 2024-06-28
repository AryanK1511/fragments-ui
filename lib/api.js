// fragments microservice API to use, defaults to localhost:8080 if not set in env
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Given an authenticated user, request all fragments for this user from the fragments microservice.
export const getUserFragments = async (user) => {
  const res = await fetch(`${apiUrl}/v1/fragments?expand=1`, {
    headers: {
      Authorization: `Bearer ${user.idToken.toString()}`,
      'Content-Type': 'application/json',
    },
  });

  // Check if the request went through
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  // Fetch the response
  const data = await res.json();
  if (data.status === 'error') {
    throw new Error(data.error.message);
  }

  return data;
};

// Given an authenticated user, request all fragments for this user from the fragments microservice.
export const createUserFragment = async (formData) => {
  // Call the fragments API to create a fragment
  const res = await fetch(`${apiUrl}/v1/fragments`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${formData.get('idToken')}`,
      'Content-Type': formData.get('contentType'),
    },
    body: formData.get('fragmentData'),
  });

  // Check if the request went through
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  // Fetch the response
  const data = await res.json();

  if (data.status === 'error') {
    throw new Error(data.error.message);
  }

  return data;
};
