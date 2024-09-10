import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { AddUser } from "./AddUser";

export const UsersEmpty = () => {
  return (
    <div
      className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      x-chunk="dashboard-02-chunk-1"
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          You have no products
        </h3>
        <p className="text-sm text-muted-foreground">
          You can start selling as soon as you add a product.
        </p>
        <Modal
          trigger={<Button className="mt-4">Add User</Button>}
          content={<AddUser />}
        />
      </div>
    </div>
  );
};
