import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";

const UserOptions = () => {
  const navigate = useNavigate();
  const {userLogoutMutation}= useAppContext();
  const handleSignOut = async () => {
    try {
      const isConfirm= confirm("Are you sure you want to logout?")
      if(!isConfirm) return;
      await userLogoutMutation.mutateAsync();
      navigate("/login",{replace:true});
    }
    catch (error) {

    }
  }
  return (
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Button onClick={handleSignOut} size="sm" variant="ghost"  className="w-full cursor-pointer">
        <LogOut className="mr-2 h-4 w-4" />
        <span>Logout</span>
        </Button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default UserOptions;