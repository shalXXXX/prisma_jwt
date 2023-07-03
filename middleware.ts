import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // console.log("in middleware: ", req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({token}) => {
        // console.log("in middleware authorized; ", token)
        return token?.role === "admin"
      }
    },
    pages: {
      signIn: "/signIn",
    },
  }
) 

export const config = {
  matcher: ["/((?!signUp|api|signIn).*)"],
}