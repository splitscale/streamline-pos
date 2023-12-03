export function parseClerkId(prismaId: string): string {
  // Assuming the format is "user_<ID>"
  const parts = prismaId.split("_");

  if (parts.length === 2 && parts[0] === "user") {
    const userId = parts[1];
    return userId ?? "";
  } else {
    return "";
  }
}
