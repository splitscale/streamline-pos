"use server";

import { env } from "~/env.mjs";

export default async function getUsers() {
  const token = env.SUPER_ADMIN_PASSWORD;

  const res = await fetch(
    `http://localhost:8080/auth/v1/users?token=${token}`,
    {
      method: "GET",
    },
  );

  return await res.json();
}
