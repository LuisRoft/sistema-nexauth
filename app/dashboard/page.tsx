import { Metadata } from "next";
import { DataTable } from "./data-table";
import { columns, User } from "./columns";
import AddUser from "@/components/add-user";

export const metadata: Metadata = {
  title: "Dashboard | Sistema Matricula",
  description: "Sistema de matricula para la PUCEM",
};

async function getData(): Promise<User[]> {
  const res = await fetch("http://localhost:3000/api/user", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Dashboard() {
  const data = await getData();

  return (
    <main className="container mx-auto py-20">
      <h1 className="font-bold text-xl mb-10">Sistema de Matriculacion</h1>
      <AddUser />
      <DataTable columns={columns} data={data} />
    </main>
  );
}
