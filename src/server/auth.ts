import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { randomUUID, randomBytes } from "crypto";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "~/env.mjs";

import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      // ...other properties
      // role: UserRole;
      name: string;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  //   id: string;
  //   name: string;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user, token }) => ({
      ...session,
      ...token,
    }),
    jwt: ({ account, token, user, profile }) => {
      return { ...user, ...account, ...profile, ...token };
    },
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  secret: env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Admin Privileges",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "chad" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("[Environment] ", env.NODE_ENV);

        if (!credentials) return null;

        const username = credentials["username"];
        const password = credentials["password"];

        const isAuthorized =
          username === env.SUPER_ADMIN_USERNAME &&
          password === env.SUPER_ADMIN_PASSWORD;

        if (!isAuthorized) {
          // Return null if user data could not be retrieved
          return null;
        }

        const user = {
          id: "sudo",
          name: env.SUPER_ADMIN_USERNAME,
        };

        console.log("[Auth] ", "Super admin Authorized");

        return user;
      },
    }),
    CredentialsProvider({
      id: "user-login",
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        const res = await fetch("/your/endpoint", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
