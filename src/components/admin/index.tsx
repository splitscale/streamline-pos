import { signIn, signOut, useSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

// import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { api } from "~/utils/api";

export default async function DisplayUserList() {
  const prisma = new PrismaClient();

  const allUsers = await prisma.account.findMany();

  console.log(allUsers);

  return (
    <>
      <div className=" flex gap-3 border-4 border-slate-400 bg-[#dfd8d800] p-4">
        <div className="flex flex-col text-3xl">Admin View</div>
        <div className="flex flex-col">
          <p className="flex text-2xl">User List:</p>
          <div></div>
        </div>
      </div>
    </>
  );
}
