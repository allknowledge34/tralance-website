"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";

export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please provide both email and password." };
  }

  const expectedEmail = process.env.ADMIN_EMAIL;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedEmail || !expectedPassword) {
    console.error("Admin credentials are not configured in environment variables.");
    return { error: "Authentication is not configured properly." };
  }

  if (email === expectedEmail && password === expectedPassword) {
    await createSession();
    redirect("/");
  } else {
    return { error: "Invalid email or password." };
  }
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
