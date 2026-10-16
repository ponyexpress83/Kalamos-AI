"use client";

import { useRouter } from "next/navigation";

/** Uscita dal workspace: usata nella barra laterale e nella barra mobile. */
export default function LogoutButton({ className, label = "Esci dal workspace →" }: { className?: string; label?: string }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button type="button" onClick={logout} className={className}>
      {label}
    </button>
  );
}
