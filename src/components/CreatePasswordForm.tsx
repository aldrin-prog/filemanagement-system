import React, { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { updateUserPassword } from "@/services/userService";

const PasswordValidationItem = ({
  isValid,
  text,
}: {
  isValid: boolean;
  text: string;
}) => (
  <div className="flex items-center gap-2">
    {isValid ? (
      <CheckCircle2 className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-muted-foreground" />
    )}
    <span className={isValid ? "text-sm" : "text-sm text-muted-foreground"}>
      {text}
    </span>
  </div>
);

const CreatePasswordForm = ({ email }: { email: string }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const passwordCriteria = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[^A-Za-z0-9]/.test(password),
    passwordsMatch: password === confirmPassword && password !== "",
  };

  const isValidPassword = Object.values(passwordCriteria).every(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidPassword) return;

    setIsLoading(true);

    try {
      // Simulate API call
      const res=await updateUserPassword({oldPassword:oldPassword, newPassword: password})
      console.log("res", res)
      // toast({
      //   title: "Password created",
      //   description: "Your password has been successfully created.",
      // });

      // navigate("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem creating your password.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="text"
          value={email}
          placeholder="example@email.com"
          required
          disabled
          autoComplete="email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Old Password</Label>
        <Input
          id="old_password"
          type="password"
          defaultValue={password}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="••••••••"
          required
          autoComplete="old-password"
          disabled={isLoading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">New Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          autoComplete="new-password"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          required
          autoComplete="new-password"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-1 rounded-md border p-3">
        <h3 className="text-sm font-medium">Password requirements:</h3>
        <div className="mt-2 space-y-2 text-xs">
          <PasswordValidationItem
            isValid={passwordCriteria.minLength}
            text="At least 8 characters"
          />
          <PasswordValidationItem
            isValid={passwordCriteria.hasUppercase}
            text="At least one uppercase letter"
          />
          <PasswordValidationItem
            isValid={passwordCriteria.hasLowercase}
            text="At least one lowercase letter"
          />
          <PasswordValidationItem
            isValid={passwordCriteria.hasNumber}
            text="At least one number"
          />
          <PasswordValidationItem
            isValid={passwordCriteria.hasSpecialChar}
            text="At least one special character"
          />
          <PasswordValidationItem
            isValid={passwordCriteria.passwordsMatch}
            text="Passwords match"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={!isValidPassword || isLoading}
      >
        {isLoading ? "Creating..." : "Create Password"}
      </Button>
    </form>
  );
};

export default CreatePasswordForm;
