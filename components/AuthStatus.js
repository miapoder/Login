import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { signOut } from "@/lib/actions";
import styles from "./AuthStatus.module.css";

export default async function AuthStatus() {
  const user = await getCurrentUser();

  if (!user) {
    return <Link href="/login">Log in</Link>;
  }

  return (
    <div className={styles.authStatus}>
      <Link href="/profile">{user.email}</Link>

      <form action={signOut}>
        <button type="submit">Log out</button>
      </form>
    </div>
  );
}
