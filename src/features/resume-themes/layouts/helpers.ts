export const splitText = (value?: string) => {
  if (!value) return [];

  return value
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
};