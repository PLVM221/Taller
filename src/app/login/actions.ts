"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/auth";

export async function login(formData: FormData) {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  if (email !== "admin@tallernorte.com" || password !== "Taller2026!") {
    redirect("/login?error=1");
  }
  const store = await cookies();
  store.set("taller_session", await createSession(), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 28800, path: "/" });
  redirect("/dashboard");
}
