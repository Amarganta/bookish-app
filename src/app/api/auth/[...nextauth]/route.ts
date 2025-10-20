import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

//  Log para debugging (temporal)
// console.log("🔍 Environment variables check:", {
//   hasClientId: !!process.env.GOOGLE_CLIENT_ID,
//   hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
//   hasSecret: !!process.env.NEXTAUTH_SECRET,
//   nodeEnv: process.env.NODE_ENV,
//   clientIdStart: process.env.GOOGLE_CLIENT_ID?.substring(0, 10) + "...",
// });

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      console.log("JWT Callback:", {
        account: !!account,
        profile: !!profile,
      });

      if (account && profile) {
        token.id = profile.sub;
        token.name = profile.name;
        token.email = profile.email;
        token.picture = (profile as any).picture;

        console.log("JWT Token updated:", {
          id: token.id,
          name: token.name,
          email: token.email,
        });
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback:", {
        token: !!token,
        session: !!session,
      });

      if (token && session.user) {
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string;

        console.log("✅ Session updated:", session.user);
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
