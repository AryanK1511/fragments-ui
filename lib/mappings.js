// ===== Mapping of all the possible conversions supported by the fragments API =====
export const conversions = {
  'text/plain': ['text/plain'],
  'text/markdown': ['text/markdown', 'text/html', 'text/plain'],
  'text/html': ['text/html', 'text/plain'],
  'text/csv': ['text/csv', 'text/plain', 'application/json'],
  'application/json': ['application/json', 'application/yaml', 'text/plain'],
  'application/yaml': ['application/yaml', 'text/plain'],
  'image/png': ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif'],
  'image/jpeg': ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif'],
  'image/webp': ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif'],
  'image/avif': ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif'],
  'image/gif': ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif'],
};

// ===== Mapping of all the types supported by the fragments API =====
export const typeKeys = Object.keys(conversions);

// ===== Mapping of all the types to their respective extensions =====
export const mimeToExtension = {
  'text/plain': '.txt',
  'text/markdown': '.md',
  'text/html': '.html',
  'text/csv': '.csv',
  'application/json': '.json',
  'application/yaml': '.yaml',
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/avif': '.avif',
};
