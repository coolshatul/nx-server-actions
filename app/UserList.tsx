"use client";

import { useState } from "react";
import { addUser, getUser } from "./actions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type User = {
  id: number;
  name: string;
};

export default function UserList({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [newUserName, setNewUserName] = useState("");
  const router = useRouter();

  const handleRefresh = async () => {
    const updatedUsers = await getUser();
    setUsers(updatedUsers);
  };

  const handleAddUser = async () => {
    if (newUserName.trim()) {
      const result = await addUser(newUserName);
      if (result.success) {
        setNewUserName("");
        handleRefresh();
        router.refresh(); // Refresh the server component
      } else {
        console.error("Failed to add user:", result.error);
        // You might want to show an error message to the user here
      }
    }
  };

  return (
    <div className="space-y-4">
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="p-2 bg-black-100 rounded">
            {user.name}
          </li>
        ))}
      </ul>
      <div className="flex space-x-2">
        <Input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Enter new user name"
          aria-label="New user name"
        />
        <Button onClick={handleAddUser}>Add User</Button>
      </div>
      <Button onClick={handleRefresh} variant="outline">
        Refresh Users
      </Button>
    </div>
  );
}
