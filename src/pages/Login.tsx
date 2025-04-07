import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { getAuthenticatedUser } from "@/services/userService";
import { useAppContext } from "@/context/AppContext";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { userLoginMutation } = useAppContext();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await userLoginMutation.mutateAsync({
        username: user.email,
        password: user.password,
      });
      navigate("/dashboard", { replace: true });
    } catch (error: any) {
      alert(`Error Logging in: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const checkUser = async () => {
      try {
        const isAuthenticated = await getAuthenticatedUser();
        if (isAuthenticated) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error checking user", error);
      }
    };
    checkUser();
  }, []);
  if (isLoading) return <></>;
  return (
    <div className=" flex h-screen w-screen flex-col items-center justify-center">
      <Link to="/" className="absolute left-4 top-4 md:top-8">
        Back
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Login to your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password to login
          </p>
        </div>
        <Card className="m-5">
          <form onSubmit={onSubmit}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleInputChange}
                    defaultValue={user.email}
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    {/* <Link to="/forgot-password" className="text-xs underline">
                      Forgot password?
                    </Link> */}
                  </div>
                  <Input
                    id="password"
                    name="password"
                    onChange={handleInputChange}
                    defaultValue={user.password}
                    type="password"
                    autoComplete="current-password"
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
