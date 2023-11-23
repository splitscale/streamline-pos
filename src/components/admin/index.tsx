"use client";

import { Card, CardContent } from "../ui/card";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

export interface Users {
  id: string;
  created: string;
  edited: string;
  firstName: string;
  lastName: string;
  photoUrl: null;
  email: null;
}

export default function DisplayUserList() {
  const { data: sessionData } = useSession();

  const { data: users } = api.post.getUsers.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <>
      {users ? (
        users.map((user: any) => (
          <div key={user.id}>
            <Card>
              <CardContent className="align-center  flex flex-col p-2">
                <div key={user.id}>
                  <div className="space-y-1">
                    <p className="text-md font-semibold leading-none">
                      {user.firstName ? user.firstName : "No username"}
                    </p>
                    <p className="text-sm text-muted-foreground">{user.id}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))
      ) : (
        <p>Looks like there is no users</p>
      )}
    </>
  );
}
