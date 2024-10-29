"use client";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import CreateUserForm from "./create-user-form";

export default function AddUser() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="mb-4">
        <Button variant="outline">Add User</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new user.
          </DialogDescription>
          <CreateUserForm setOpen={setOpen} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
