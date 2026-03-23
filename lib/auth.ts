import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyAuthToken } from "@/lib/auth-token";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        authToken: { type: "text" },
      },
      async authorize(credentials) {
        const token = credentials?.authToken;
        if (typeof token !== "string") return null;

        const user = verifyAuthToken(token);
        if (!user) return null;

        return {
          id: user.email,
          email: user.email,
          role: user.role,
          customerId: user.customerId,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    redirect({ url, baseUrl }) {
      if (url === baseUrl || url === baseUrl + "/") return baseUrl + "/portal";
      return url;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role ?? "customer";
        token.customerId = user.customerId ?? "";
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      session.user.customerId = token.customerId;
      return session;
    },
  },
});
