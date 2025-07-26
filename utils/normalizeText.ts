export const normalizeText = (text: string): string => {
  const specialChars = /[!@#$%^&*(),.?":{}|<>]/g;
  text = text.replace(specialChars, "").trim();
  return text.trim();
};
export const normalizeCategory = (text: string): string => {
  // capitalize the first letter and remove last (s)
  const capitalized = text.charAt(0).toUpperCase() + text.slice(1);
  // remove the last character if it's 's'
  if (capitalized.endsWith("s")) {
    return capitalized.slice(0, -1);
  }
  // if ies, replace with y
  if (capitalized.endsWith("ies")) {
    return capitalized.slice(0, -3) + "y";
  }
  // if es, replace with e
  if (capitalized.endsWith("es")) {
    return capitalized.slice(0, -2) + "e";
  }

  return capitalized;
};
