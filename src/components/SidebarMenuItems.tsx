import { Link } from "react-router-dom";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { FileUser, LayoutDashboard } from "lucide-react";
import SubmissionAdmin from "./SubmissionAdmin";

const SidebarMenuItems = ({
    pathname,
    user,
  }: {
    pathname: string;
    user: any;
  }) => (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
          <Link to="/dashboard">
            <LayoutDashboard />
            <span>Dashboard</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      {user?.["cognito:groups"].includes("Admin") && <SubmissionAdmin />}
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link to="/my-submissions">
            <FileUser />
            <span>My Submission</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      {user?.["cognito:groups"].includes("Admin") && (
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to="/users">
              <FileUser />
              <span>Users</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
    </>
  );
export default SidebarMenuItems;  