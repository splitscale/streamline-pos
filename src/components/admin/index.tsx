"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function DisplayUserList(userData: any) {
  const allUsers = [
    {
      id: "1e750688-87ba-4d6d-9401-7fe28441388d",
      created: "2023-11-15T14:17:37.000+00:00",
      edited: "2023-11-15T14:17:37.000+00:00",
      firstName: "Ian",
      lastName: "Tejada",
      photoUrl: null,
      email: null,
    },
    {
      id: "791ce8e1-2470-42c1-a1ce-948adf679121",
      created: "2023-11-15T14:17:42.000+00:00",
      edited: "2023-11-15T14:17:42.000+00:00",
      firstName: "Chad",
      lastName: "Andrada",
      photoUrl: null,
      email: null,
    },
    {
      id: "c321d77b-acec-4c27-bd71-e5913c1dc16c",
      created: "2023-11-15T14:17:22.000+00:00",
      edited: "2023-11-15T14:17:22.000+00:00",
      firstName: "Jerome",
      lastName: "Cabugwason",
      photoUrl: null,
      email: null,
    },
    {
      id: "cc10bfd4-9fc8-484d-8d1c-9ddd2068d0ab",
      created: "2023-11-15T14:17:32.000+00:00",
      edited: "2023-11-15T14:17:32.000+00:00",
      firstName: null,
      lastName: null,
      photoUrl: null,
      email: null,
    },

    //
    {
      id: "1e754288-85ba-436d-4201-7fe28141388d",
      created: "2023-11-15T14:17:37.000+00:00",
      edited: "2023-11-15T14:17:37.000+00:00",
      firstName: "Princess",
      lastName: "Queen",
      photoUrl: null,
      email: null,
    },
    {
      id: "111d38e1-2470-42c1-a1ce-948gwa679121",
      created: "2023-11-15T14:17:42.000+00:00",
      edited: "2023-11-15T14:17:42.000+00:00",
      firstName: "Albert",
      lastName: "Einstein",
      photoUrl: null,
      email: null,
    },
    {
      id: "c321d7ds-acec-4c27-bd71-e5643c1dc16c",
      created: "2023-11-15T14:17:22.000+00:00",
      edited: "2023-11-15T14:17:22.000+00:00",
      firstName: "Bernoulli",
      lastName: null,
      photoUrl: null,
      email: null,
    },
    {
      id: "cc10asdd4-9fc8-484d-8d1c-9dsd2068d0ab",
      created: "2023-11-15T14:17:32.000+00:00",
      edited: "2023-11-15T14:17:32.000+00:00",
      firstName: "Newton",
      lastName: null,
      photoUrl: null,
      email: null,
    },
  ];

  console.log(allUsers);

  return (
    <>
      {allUsers.map((user: any) => (
        <div key={user.id}>
          <Card>
            <CardHeader>
              <CardTitle>
                {user.firstName ? user.firstName : "No username"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{user.id}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </>
  );
}

// name id fname lname
