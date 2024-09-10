import { Home, Users, Cog } from "lucide-react";
import { ReactNode } from "react";

export type LinkItems = {
  path: string;
  name: string;
  icon: ReactNode;
  badge?: ReactNode;
};

export const appPaths: LinkItems[] = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <Home className="h-5 w-5" />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <Users className="h-5 w-5" />,
  },
  {
    name: "Modules",
    path: "/admin/modules",
    icon: <Cog className="h-5 w-5" />,
  },
];
