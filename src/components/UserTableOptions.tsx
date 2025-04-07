import { MoreHorizontal, Shield, ShieldMinus, ShieldPlus } from "lucide-react";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "./ui/dropdown-menu";
import { UserListType } from "@/utils/propsInterface";
import { useAppContext } from "@/context/AppContext";
const UserTableOptions = ({user}:{user:UserListType}) => {
  const {userDisableMutation,userEnableMutation}= useAppContext();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          <Shield className="mr-2 h-4 w-4" />
          <span>Change Role</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {
          user.status === "active" ? (
            <DropdownMenuItem onClick={async ()=> await userDisableMutation.mutateAsync({username:user.id}) } className="text-destructive">
              <ShieldMinus className="mr-2 h-4 w-4" />
              <span>Deactivate User</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={async ()=> userEnableMutation.mutateAsync({username:user.id})} className="text-green-500">
              <ShieldPlus className="mr-2 h-4 w-4" />
              <span>Activate User</span>
            </DropdownMenuItem>
          )

        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserTableOptions