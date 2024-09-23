import { NextResponse } from "next/server";

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

export async function GET() {
  // Simulate fetching users from a database
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const newUser = await request.json();

  const newId =
    users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

  newUser.id = newId;

  users.push(newUser);

  console.log("Added new user:", newUser);
  return NextResponse.json(
    { message: "User added successfully" },
    { status: 201 }
  );
}
