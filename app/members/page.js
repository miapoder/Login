import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function MembersPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main>
      <h1>Members</h1>
      <p>Welcome! You are logged in.</p>
      <p>Your email: {user.email}</p>
    </main>
  );
}
