import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { ArrowUp, Download, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { ActionOptionProps } from "@/utils/propsInterface";
import { downloadResource } from "@/services/resourceService";
import UpdateSubmissionStatus from "./UpdateSubmissionStatus";
import {  useState } from "react";
import { useAppContext } from "@/context/AppContext";

const ActionOption = ({ deleteMutation,resource }: ActionOptionProps) => {
  const{user}=useAppContext()
  const [showDialog, setShowDialog] = useState(false); // State to manage dialog visibility
  const handleDeleteResource = async (id: string) => {
    const confirmationMessage = "Are you sure you want to delete this resource?"; // Extracted message
    const isConfirm = confirm(confirmationMessage);
    if (!isConfirm) return; // Early return for better readability
    try {
      await deleteMutation.mutateAsync({ id,attachments:resource.files });
    } catch (error) {
      console.error("Error deleting resource:", error); // Improved error logging
      alert("An error occurred while deleting the resource. Please try again."); // Provide user feedback
    }
  };
  const handleDownloadFiles = async (files:string[]) => {

    if(!files || files.length === 0){
      alert("No files to download"); // Alert if no files are available for download
      return; // Early return if no files to download
    }
    const confirmationMessage = "Are you sure you want to download these files?"; // Extracted message
    if (!confirm(confirmationMessage)) return; // Early return for better readability
    try{
        await Promise.all(
            files.map(async (file) => {
              await downloadResource(file)
            }))
    }catch(error){

    }
  }
  return (
    <>
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {
          user?.["cognito:groups"]?.includes("Admin") && (
            <DropdownMenuItem onClick={() => setShowDialog(true)}>
              <ArrowUp className="mr-2 h-4 w-4"/>
              <span>Update Status</span>
            </DropdownMenuItem>
          )
        }
        <DropdownMenuItem onClick={() => handleDownloadFiles(resource.files)}>
          <Download className="mr-2 h-4 w-4" />
          <span>Download Files</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleDeleteResource(resource.id)}
          className="text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <UpdateSubmissionStatus resource={resource} showDialog={showDialog} setShowDialog={setShowDialog} />
    </>
  );
};

export default ActionOption;