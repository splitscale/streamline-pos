export function randomOID(): string {
  const letters: string = Array.from({ length: 3 }, () =>
    getRandomChar("abcdefghijklmnopqrstuvwxyz"),
  ).join("");
  const numbers: string = Array.from({ length: 3 }, () =>
    getRandomChar("0123456789"),
  ).join("");

  return `#${letters.toUpperCase()}${numbers}`;
}

function getRandomChar(characters: string): string {
  if (characters.length === 0) return "";

  const randomIndex: number = Math.floor(Math.random() * characters.length);
  return characters[randomIndex] as string;
}
