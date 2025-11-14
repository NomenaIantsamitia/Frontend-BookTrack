// components/ProtectedRoute.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/"); // 🚫 Pas de token → redirection
    } else {
      setIsAuthorized(true); // ✅ OK, utilisateur autorisé
    }
  }, [router]);

  if (!isAuthorized) {
    return null; // ⏳ Pendant la vérification, rien n'est affiché
  }

  return <>{children}</>;
}
