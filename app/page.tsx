import { getUser } from "./actions";
import UserList from "./UserList";

export default async function Page() {
  const initialUsers = await getUser();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <UserList initialUsers={initialUsers} />
    </div>
  );
}
