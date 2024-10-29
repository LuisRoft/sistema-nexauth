"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { Button } from "./ui/button";
import CreateUserForm from "./create-user-form";
import { useState } from "react";

export default function UpdateUser({ defaultValues }: { defaultValues: any }) {
  const [open, setOpen] = useState(false);
  console.log(defaultValues);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit size={16} strokeWidth={2} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <CreateUserForm setOpen={setOpen} defaultValues={defaultValues} />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
