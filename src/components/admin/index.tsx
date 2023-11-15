"use client";

export default function DisplayUserList(userData: any) {
  const allUsers = [
    {
      id: "1e750688-87ba-4d6d-9401-7fe28441388d",
      created: "2023-11-15T14:17:37.000+00:00",
      edited: "2023-11-15T14:17:37.000+00:00",
      firstName: null,
      lastName: null,
      photoUrl: null,
      email: null,
    },
    {
      id: "791ce8e1-2470-42c1-a1ce-948adf679121",
      created: "2023-11-15T14:17:42.000+00:00",
      edited: "2023-11-15T14:17:42.000+00:00",
      firstName: null,
      lastName: null,
      photoUrl: null,
      email: null,
    },
    {
      id: "c321d77b-acec-4c27-bd71-e5913c1dc16c",
      created: "2023-11-15T14:17:22.000+00:00",
      edited: "2023-11-15T14:17:22.000+00:00",
      firstName: null,
      lastName: null,
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
  ];

  console.log(allUsers);

  return (
    <>
      <div className=" flex gap-3 border-4 border-slate-400 bg-[#dfd8d800] p-4">
        <div className="flex flex-col text-3xl">Admin View</div>
        <div className="flex flex-col">
          <p className="flex text-lg">User Accounts:</p>
          <div>
            {allUsers.map((user: any) => (
              <div key={user.id}>{`ID: ${user.id}`}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
