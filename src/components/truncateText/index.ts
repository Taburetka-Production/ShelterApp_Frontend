export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength);
  const lastDotIndex = truncated.lastIndexOf(" ");
  return lastDotIndex !== -1
    ? truncated.slice(0, lastDotIndex + 1) + "..."
    : truncated + "...";
};
