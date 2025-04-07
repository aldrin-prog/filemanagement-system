
import { UseMutationResult } from "@tanstack/react-query";

interface ActionOptionProps {
    id: string;
    attachments: [];
    deleteMutation: UseMutationResult;
}
interface FileSelectorProps {
    files: FileList | null;
    setFiles: React.Dispatch<React.SetStateAction<FileList | null>>;
}
export type { ActionOptionProps, FileSelectorProps };