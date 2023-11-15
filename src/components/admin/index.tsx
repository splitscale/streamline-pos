"use client"

export default async function DisplayUserList(userData: any) {

  const allUsers = userData;

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
