export const matchesKeywords = (address: string, keywords: string): boolean => {
  if (keywords === "") return true;

  const splitKeywords = keywords
    .split(/\s+/)
    .filter((keyword) => keyword !== "");

  return splitKeywords.every((keyword) => address.includes(keyword));
};
