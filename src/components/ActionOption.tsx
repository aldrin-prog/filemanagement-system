import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { Download, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { ActionOptionProps } from "@/utils/propsInterface";
import { downloadResource } from "@/services/resourceService";

const ActionOption = ({ deleteMutation, id, attachments }: ActionOptionProps) => {
  const handleDeleteResource = async (id: string) => {
    const confirmationMessage = "Are you sure you want to delete this resource?"; // Extracted message
    const isConfirm = confirm(confirmationMessage);

    if (!isConfirm) return; // Early return for better readability

    try {
      await deleteMutation.mutateAsync({ id, attachments });
    } catch (error) {
      console.error("Error deleting resource:", error); // Improved error logging
      alert("An error occurred while deleting the resource. Please try again."); // Provide user feedback
    }
  };
  const handleDownloadFiles = async (files:string[]) => {
    if(!files || files.length === 0) return; // Early return if no files to download
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => handleDownloadFiles(attachments)}>
          <Download className="mr-2 h-4 w-4" />
          <span>Download Files</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleDeleteResource(id)}
          className="text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionOption;