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
import { ResourceListType } from "@/utils/propsInterface";
import { useAppContext } from "@/context/AppContext";

const UpdateSubmissionStatus = ({
    resource,
    showDialog,
    setShowDialog,
}: {
    resource: ResourceListType;
    showDialog: boolean;
    setShowDialog: (open: boolean) => void;
}) => {
    const [status, setStatus] = useState(resource.statusForm); // assume `resource.status` exists
    const [loading, setLoading] = useState(false);
    const {updateResourceStatusMutation} = useAppContext(); // assume this is defined in your context
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateResourceStatusMutation.mutateAsync({
                id: resource.id,
                status: status,})
        } catch (error) {
            console.error("Failed to update role", error);
        } finally {
            setLoading(false);
            setShowDialog(false); // close the dialog after successful role change
        }
    };
    return (
        <AlertDialog onOpenChange={setShowDialog} open={showDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Form Status</AlertDialogTitle>
                    <AlertDialogDescription>
                        Update the status of the form submission
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <form onSubmit={handleSubmit} className="space-y-2">
                    <div>
                        <label htmlFor="status" className="text-sm font-medium block mb-1">
                            Status
                        </label>
                        <select
                            id="status"
                            defaultValue={resource.statusForm}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full border px-2 py-1 rounded text-sm"
                        >
                            <option value="pending">Pending</option>
                            <option value="processed">Processed</option>
                        </select>
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Updating..." : "Confirm Status Change"}
                        </Button>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
};
export default UpdateSubmissionStatus;
