
import { UseMutationResult } from "@tanstack/react-query";

interface ActionOptionProps {
    id: string;
    attachments: string[];
    deleteMutation: UseMutationResult;
}
interface FileSelectorProps {
    files: FileList | null;
    setFiles: React.Dispatch<React.SetStateAction<FileList | null>>;
}

interface UserListType{
    id: string;
    name: string;
    email: string;
    submissions: number;
    role: string;
    status: string;
    confirmationStatus: string;
}
type ResourceListType = {
  id: string;
  fullname: string;
  category: string;
  subject: string;
  createdAt: string;
  status: string;
  files: string[];
  username: string | null;
};
type ResourceType={
  fullname:string,
  email:string,
  phoneNumber:string,
  category:string,
  subject:string,
  message:string,
}
export type { ActionOptionProps, FileSelectorProps, ResourceListType,UserListType,ResourceType };