import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

export const Home = () => {
  const { token } = useAuth();

  return (
    <div>
      {token ? (
        <Link to="/admin" className="underline">
          admin
        </Link>
      ) : (
        <Link to="/login" className="underline">
          login
        </Link>
      )}
    </div>
  );
};
