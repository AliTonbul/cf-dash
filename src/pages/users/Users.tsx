import React from "react";
import { UsersEmpty } from "./UsersEmpty";

export const Users = () => {
  return (
    <React.Fragment>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
      </div>
      <UsersEmpty />
    </React.Fragment>
  );
};
