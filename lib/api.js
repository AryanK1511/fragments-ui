import { mimeToExtension } from './mappings';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Given an authenticated user, request all fragments for this user from the fragments microservice.
export const getUserFragments = async (user) => {
  const res = await fetch(`${apiUrl}/v1/fragments?expand=1`, {
    headers: {
      Authorization: user.getAuthorizationHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  if (data.status === 'error') {
    throw new Error(data.error.message);
  }

  return data;
};

// Given an authenticated user, request all fragments for this user from the fragments microservice.
export const createUserFragment = async (file, selectedType, user) => {
  const res = await fetch(`${apiUrl}/v1/fragments`, {
    method: 'POST',
    headers: {
      Authorization: user.getAuthorizationHeaders(),
      'Content-Type': selectedType,
    },
    body: file,
  });

  const data = await res.json();

  if (!res.ok) {
    if (data.status === 'error') throw new Error(data.error.message);

    throw new Error(`${res.status} ${res.statusText}`);
  }

  return data;
};

// Given an authenticated user, update the fragment for the user by ID.
export const updateUserFragment = async (file, selectedType, user, fragmentId) => {
  const res = await fetch(`${apiUrl}/v1/fragments/${fragmentId}`, {
    method: 'PUT',
    headers: {
      Authorization: user.getAuthorizationHeaders(),
      'Content-Type': selectedType,
    },
    body: file,
  });

  const data = await res.json();

  if (!res.ok) {
    if (data.status === 'error') throw new Error(data.error.message);

    throw new Error(`${res.status} ${res.statusText}`);
  }

  return data;
};

// Given an authenticated user, delete the fragment by ID
export const deleteUserFragment = async (fragmentId, user) => {
  const res = await fetch(`${apiUrl}/v1/fragments/${fragmentId}`, {
    method: 'DELETE',
    headers: {
      Authorization: user.getAuthorizationHeaders(),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    if (data.status === 'error') throw new Error(data.error.message);

    throw new Error(`${res.status} ${res.statusText}`);
  }

  return data;
};

// Given an authenticated user, get the content of a fragment by using its ID
export const getUserFragment = async (fragmentId, user, mimeType) => {
  // Find the extension corresponding to the MIME type
  const extension = mimeToExtension[mimeType];

  if (!extension) {
    throw new Error(`Unsupported MIME type: ${mimeType}`);
  }

  const res = await fetch(`${apiUrl}/v1/fragments/${fragmentId}${extension}`, {
    method: 'GET',
    headers: {
      Authorization: user.getAuthorizationHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const blob = await res.blob();
  return blob;
};
