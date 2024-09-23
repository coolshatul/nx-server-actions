"use server";

import { revalidatePath } from "next/cache";

const apiEndpoint = process.env.API_ENDPOINT;

export async function addUser(name: string) {
  const res = await fetch(`${apiEndpoint}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  if (res.ok) {
    revalidatePath("/");
    return { success: true };
  } else {
    return { success: false, error: "Failed to add user" };
  }
}

export async function getUser() {
  const res = await fetch(`${apiEndpoint}/api/users`);
  if (res.ok) {
    const updatedUsers = await res.json();
    return updatedUsers;
  }
}
