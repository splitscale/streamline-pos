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

        console.log("[Auth] Attempting to login as SuperUser");

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
      id: "user-signup",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (credentials?.username === env.SUPER_ADMIN_USERNAME) return null;

        console.log("[Auth] Attempting to Register as User");

        const res = await fetch(
          `${env.SHIELD_BASE_URL}auth/v1/credential/register`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          },
        );

        if (!res.ok) return null;

        console.log("[Auth] Attempting to login as User");

        const loginRes = await fetch(
          `${env.SHIELD_BASE_URL}auth/v1/credential/login`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          },
        );

        const user: {
          tokens: {
            accessToken: string;
            refreshToken: string;
          };
          user: {
            id: string;
            created: string;
            edited: string;
            displayName: string;
            firstName: null;
            lastName: null;
            photoUrl: null;
            email: null;
          };
        } = await loginRes.json();

        return { id: user.user.id, name: user.user.displayName };
      },
    }),

    CredentialsProvider({
      id: "user-signin",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (credentials?.username === env.SUPER_ADMIN_USERNAME) return null;

        console.log("[Auth] Attempting to login as User");

        const loginRes = await fetch(
          `${env.SHIELD_BASE_URL}auth/v1/credential/login`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          },
        );

        if (!loginRes.ok) return null;

        const user: {
          tokens: {
            accessToken: string;
            refreshToken: string;
          };
          user: {
            id: string;
            created: string;
            edited: string;
            displayName: string;
            firstName: null;
            lastName: null;
            photoUrl: null;
            email: null;
          };
        } = await loginRes.json();

        return { id: user.user.id, name: user.user.displayName };
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
