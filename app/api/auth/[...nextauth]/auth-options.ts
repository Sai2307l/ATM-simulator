import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import UserModel from "@/app/model/User";
import dbConnect from "@/app/lib/dbconnect";
import bcrypt from "bcryptjs";


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials?.identifier },
              { username: credentials?.identifier },
            ],
          });
          if (!user) {
            throw new Error("Invalid username or password");
          }
          if (user.isVerified === false) {
            throw new Error("Please verify your email before logging in");
          }
          const isPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPassword) {
            throw new Error("Invalid  password");
          }
          return user;
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.username = token.username;
        session.user.email = token.email;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.username = user.username;
        token.email = user.email;
      }
      return token;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
