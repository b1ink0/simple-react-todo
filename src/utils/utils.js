/**
 * Generate a unique ID of specified length.
 *
 * This function generates a unique identifier using cryptographically secure random values if available.
 * If not, it falls back to using Math.random() to generate the ID. The resulting ID is a hexadecimal string.
 *
 * @returns {string} The generated unique ID.
 */
export const generateId = () => {
  // Check if crypto.randomUUID is available and use it for generating a UUID.
  if (window?.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  // Fallback to manual random generation if crypto.randomUUID is not available.
  const generateRandomBytes = () => {
    const array = new Uint8Array(16); // Generate 16 random bytes.
    if (window?.crypto) {
      window.crypto.getRandomValues(array);
    } else {
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
    }
    return array;
  };

  const array = generateRandomBytes();
  return [...array].map((byte) => byte.toString(16).padStart(2, '0')).join('');
};
