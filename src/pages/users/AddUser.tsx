import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const AddUser = ({ className }: React.ComponentProps<"form">) => {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" defaultValue="bob" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" defaultValue="shadcn@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone</Label>
        <Input type="text" id="phone" defaultValue="074000000000" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" defaultValue="@shadcn" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
};
