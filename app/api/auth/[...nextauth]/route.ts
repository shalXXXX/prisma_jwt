import { options } from "@/app/options";
import NextAuth from "next-auth/next";

const handler = NextAuth(options);

export { handler as GET, handler as POST}