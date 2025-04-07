import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUSer } from "@/services/userService";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

const validationRules = (password: string) => ({
  name: { required: "Name is required" },
  email: {
    required: "Email is required",
    pattern: {
      value: /^\S+@\S+$/i,
      message: "Invalid email format",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
  },
  confirm_password: {
    required: "Please confirm your password",
    validate: (value: string) => value === password || "Passwords do not match",
  },
});

const FormField = ({
  id,
  label,
  type = "text",
  register,
  validation,
  error,
  ...props
}: {
  id: string;
  label: string;
  type?: string;
  register: any;
  validation: any;
  error?: any;
  [key: string]: any;
}) => (
  <div className="space-y-2">
    <Label htmlFor={id} className={error && "text-red-500"}>
      {label}
    </Label>
    <Input
      id={id}
      type={type}
      className={error && "border-red-500"}
      {...register(id, validation)}
      {...props}
    />
    {error && <span className="text-red-500 text-xs">{error.message}</span>}
  </div>
);

const RegisterUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      await registerUSer({
        email: data.email,
        name: data.name,
        password: data.password,
      });
      alert("Account Created Successfully. Please confirm your email to login.");
    } catch (error: any) {
      alert(`Error Creating Account: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const validation = validationRules(password);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Link to="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        Back
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your details to create an account
          </p>
        </div>
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <FormField
                  id="name"
                  label="Name"
                  register={register}
                  validation={validation.name}
                  error={errors.name}
                  autoComplete="new-name"
                />
                <FormField
                  id="email"
                  label="Email"
                  type="email"
                  register={register}
                  validation={validation.email}
                  error={errors.email}
                  placeholder="m@example.com"
                  autoComplete="new-email"
                />
                <FormField
                  id="password"
                  label="Password"
                  type="password"
                  register={register}
                  validation={{
                    ...validation.password,
                    onChange: (e: any) => setPassword(e.target.value),
                  }}
                  error={errors.password}
                  autoComplete="new-password"
                />
                <FormField
                  id="confirm_password"
                  label="Confirm Password"
                  type="password"
                  register={register}
                  validation={validation.confirm_password}
                  error={errors.confirm_password}
                  autoComplete="new-confirm-password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
