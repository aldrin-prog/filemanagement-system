import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { UserListType } from "@/utils/propsInterface";
import { useAppContext } from "@/context/AppContext";

const ChangeUserRole = ({
  user,
  showDialog,
  setShowDialog,
}: {
  user: UserListType;
  showDialog: boolean;
  setShowDialog: (open: boolean) => void;
}) => {
  const {userChangeRoleMutation}= useAppContext(); // assume this is defined in your context
  const [newRole, setNewRole] = useState(user.role); // assume `user.role` exists
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await userChangeRoleMutation.mutateAsync({username: user.id, newRole, oldRole:user.role}); // assume `user.id` exists
      setLoading(false);
      // Optionally, you can show a success message or update the UI accordingly
      alert("User role updated successfully!");
      setShowDialog(false); // close the dialog after successful role change
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
            <label htmlFor="role" className="text-sm font-medium block mb-1">
              Select new role
            </label>
            <select
              id="role"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full border px-2 py-1 rounded text-sm"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
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
};

export default ChangeUserRole;
