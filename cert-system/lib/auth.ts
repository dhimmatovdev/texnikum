import { cookies } from "next/headers";

export function isAdminSession(): boolean {
  return cookies().get("admin_session")?.value === "true";
}
