import { Link } from "react-router-dom";
import { appPaths } from "./app-paths";

export const SideBar = () => {
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {appPaths.map((link) => (
        <Link
          key={link.name}
          to={link.path}
          className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
        >
          {link.icon}
          {link.name}
          {link.badge}
        </Link>
      ))}
    </nav>
  );
};
