import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Sign up",
};

async function signUp(formData) {
  "use server";

  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    redirect("/signup?error=true");
  }

  redirect("/profile");
}

export default async function SignupPage({ searchParams }) {
  const user = await getCurrentUser();

  if (user) {
      redirect("/profile");
  }
  const params = await searchParams;
  const hasError = params.error === "true";

  return (
    <main>
      <h1>Sign up</h1>

      {hasError && (
        <p className="error">Could not create account. Please try again.</p>
      )}

      <form action={signUp} className="auth-form">
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
          minLength={6}
          required
        />

        <button type="submit">Sign up</button>
      </form>

      <p>
        Already have an account? <a href="/login">Log in</a>
      </p>
    </main>
  );
}
