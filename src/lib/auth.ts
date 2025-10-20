import GoogleProvider from "next-auth/providers/google";
import type { GoogleProfile } from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
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
      console.log("🔹 JWT Callback:", {
        account: !!account,
        profile: !!profile,
      });

      if (account && profile) {
        const googleProfile = profile as GoogleProfile;
        token.id = googleProfile.sub;
        token.name = googleProfile.name;
        token.email = googleProfile.email;
        token.picture = googleProfile.picture;

        console.log("✅ JWT Token updated:", {
          id: token.id,
          name: token.name,
          email: token.email,
        });
      }
      return token;
    },
    async session({ session, token }) {
      console.log("🔹 Session Callback:", {
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
  debug: true,
};
