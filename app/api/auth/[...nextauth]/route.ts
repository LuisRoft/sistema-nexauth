import prisma from "@/lib/db";
import CredentialsProviders from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProviders({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "luisroftl" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const userFound = await prisma.user.findUnique({
          where: {
            username: credentials?.username ?? "",
          },
        });

        if (!userFound) throw new Error("User not found");

        const matchPassword = await bcrypt.compare(
          credentials?.password ?? "",
          userFound.password
        );

        if (!matchPassword) throw new Error("Password does not match");

        return {
          id: userFound.id.toString(),
          username: userFound.username,
          email: userFound.email,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
