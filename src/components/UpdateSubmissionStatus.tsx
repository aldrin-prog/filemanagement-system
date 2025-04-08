import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  import { DropdownMenuItem } from "./ui/dropdown-menu";
  import { Shield } from "lucide-react";
  import { Button } from "./ui/button";
  import { useState } from "react";
  import { UserListType } from "@/utils/propsInterface";
  import { changeUserRole } from "@/services/userService";
  import { useAppContext } from "@/context/AppContext";
  
const UpdateSubmissionStatus = ({
    resource,
    showDialog,
    setShowDialog,
  }: {
    resource: UserListType;
    showDialog: boolean;
    setShowDialog: (open: boolean) => void;
  }) => {
  const [status, setStatus] = useState(resource.status); // assume `resource.status` exists
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
    } catch (error) {
      console.error("Failed to update role", error);
    } finally {
      setLoading(false);
    }
  };
    return (
        <AlertDialog onOpenChange={setShowDialog} open={showDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change User Role</AlertDialogTitle>
            <AlertDialogDescription>
              Note: Changing the role will affect the user's access level and
              permissions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <label htmlFor="status" className="text-sm font-medium block mb-1">
                Select new role
              </label>
              <select
                id="status"
                value={resource.status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border px-2 py-1 rounded text-sm"
              >
                <option value="pending">Pending</option>
                <option value="processed">Processed</option>
              </select>
            </div>
  
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="submit" size="sm" disabled={loading} className="">
                {loading ? "Changing..." : "Confirm Role Change"}
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    );
}
export default UpdateSubmissionStatus;