"use client"

import { Button } from "@mui/material"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter();
  const handleSignOut = () => {
    signOut();
    router.push("/signIn");
  }
  return (
    <main className="flex min-h-screen flex-col items-center">
      HOME
      <Button
        variant="contained"
        onClick={() => signOut()}
      >
        Logout
      </Button>
    </main>
  )
}
