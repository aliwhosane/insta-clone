import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export default new NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],
  theme: {
    logo: "https://links.papareact.com/sq0",
    brandColor: "#F13287",
    colorScheme: "auto",
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, user, token }) {
      session.user.username = session?.user.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();
      session.user.uid = token.sub;

      return session;
    },
  },
});
