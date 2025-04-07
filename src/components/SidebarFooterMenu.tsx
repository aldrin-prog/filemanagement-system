import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import UserOptions from "./UserOptions";

interface UserAttributes {
  name: string;
}

interface User {
  userAttributes: UserAttributes;
  "cognito:groups": string;
}

const SidebarFooterMenu = ({ user }: { user: User }) => {
  return (
    <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton>
            <Avatar className="h-6 w-6">
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="Admin"
              />
              <AvatarFallback>
                {user?.userAttributes["name"]
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span>({user?.["cognito:groups"]})</span>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <UserOptions />
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
  )
}
  export default SidebarFooterMenu;