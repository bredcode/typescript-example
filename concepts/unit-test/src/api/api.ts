export interface User {
  id: number;
  name: string;
}

export async function fetchUser(): Promise<User> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
  return res.json();
}
