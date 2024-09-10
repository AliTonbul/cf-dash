import { Package2 } from "lucide-react";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link
      to="/admin"
      className="flex items-center gap-2  text-lg font-semibold"
    >
      <Package2 className="h-6 w-6" />
      <span className="">Acme Inc</span>
    </Link>
  );
};
