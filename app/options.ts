import { prisma } from "@/global/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";



export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  debug: true,
  session: {strategy: "jwt"},
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "email",
          type: "Email",
          placeholder: "example",
        },
        password: {label: "password", type: "pasword"}
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          }),
          headers: {"Content-Type": "application/json"}
        })
        const user = await res.json()
        if (res.ok && user) {
          return {id: user.id, name: user.email, email: user.email, role: "admin"}
        }
        return null
      }
    })
  ],

  callbacks: {
    async jwt({token, user, account, profile}){
      if (user) {
        token.user = user;
        const u = user as any
        token.role = u.role
      }
      if (account) {
        token.accessToken = account.access_token
      }
      console.log("in jwt", {user, token, account, profile})
      return token
    },
    async session({ session, token, user}) {
      token.accessToken
      session.user = token.user as any
      console.log("in session", { session, token, user })
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role
        }
      }
    }
  }
}