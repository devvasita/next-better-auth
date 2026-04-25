"use client";

import { createAuthClient } from "better-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";


export function SignOutButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        authClient.signOut({
          fetchOptions: { onSuccess: () => router.push("/login") },
        })
      }
    >
      Sign out
    </Button>
  );
}
