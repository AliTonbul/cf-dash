import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiFetch } from "@/lib/api-fetch/apiFetch";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: "ali@tonbul.com",
    password: "Pickles121",
  });
  const [error, setError] = useState(false);
  const { login, token } = useAuth();
  const navigate = useNavigate();
  const handleCredentials = (e: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setCredentials((c) => ({
      ...c,
      [e.target.name]: e.target.value,
    }));
  };
  const handleLogin = async () => {
    // validate input
    // login
    const res = await apiFetch<{ token: string }>("/user/login", {
      method: "post",
      body: credentials,
    });
    if (res.data) {
      login(res.data.token);
    } else {
      setError(true);
    }

    // redirect
  };
  console.log("login", { token });
  useEffect(() => {
    if (token) {
      navigate("/admin");
    }
  }, [token]);

  return (
    <main className=" flex items-center" style={{ height: "100vh" }}>
      <Card className="container mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          {error && <p>error </p>}
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
                value={credentials.email}
                onChange={handleCredentials}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link> */}
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                required
                value={credentials.password}
                onChange={handleCredentials}
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleLogin}>
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
