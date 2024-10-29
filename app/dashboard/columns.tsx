"use client";

import DelateUser from "@/components/delate-user";
import UpdateUser from "@/components/update-user";
import { ColumnDef } from "@tanstack/react-table";

export type User = {
  id: number;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt")).toLocaleDateString();
      return <span>{date}</span>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt")).toLocaleDateString();
      return <span>{date}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <UpdateUser defaultValues={row.original} />
          <DelateUser id={row.original.id} />
        </div>
      );
    },
  },
];
