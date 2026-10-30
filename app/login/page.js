import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";

export const metadata = {
  title: "Log in",
};

async function signIn(formData) {
  "use server";

  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/login?error=true");
  }

  redirect("/profile");
}

export default async function LoginPage({ searchParams }) {
  const user = await getCurrentUser();

  if (user) {
      redirect("/profile");
  }
  
  const params = await searchParams;
  const hasError = params.error === "true";

  return (
    <main>
      <h1>Log in</h1>

      {hasError && <p className="error">Wrong email or password.</p>}

      <form action={signIn} className="auth-form">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Your email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Your password"
          autoComplete="current-password"
          required
        />

        <button type="submit">Log in</button>
      </form>

      <p>
        No account yet? <a href="/signup">Sign up</a>
      </p>
    </main>
  );
}
