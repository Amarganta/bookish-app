import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { config } from "@/lib/config";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: config.google.clientId,
      clientSecret: config.google.clientSecret,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.sub;
        token.name = profile.name;
        token.email = profile.email;
        token.picture = (profile as any).picture;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },

  secret: config.nextAuth.secret,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
