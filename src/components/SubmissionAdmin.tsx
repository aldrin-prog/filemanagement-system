import { Link } from "react-router-dom"
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"
import { FileText } from "lucide-react"

const SubmissionAdmin = () => {
    // This component is used to create a sidebar menu item for the admin to view submissions.
    // It uses the SidebarMenuItem and SidebarMenuButton components to create a link to the submissions page
    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <Link to="/submissions">
                <FileText />
                <span>Submissions(Admin)</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}

export default SubmissionAdmin