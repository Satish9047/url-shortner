const base62Chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const generateShortCode = (length: number): string => {
  let code = "";
  for (let i = 0; i < length; i++) {
    // Generate a random index between 0 and 61
    const randomIndex = Math.floor(Math.random() * base62Chars.length);
    code += base62Chars[randomIndex];
  }
  return code;
};