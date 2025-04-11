import { UseMutationResult } from "@tanstack/react-query";

interface ActionOptionProps {
  resource: ResourceListType;
  deleteMutation: UseMutationResult;
}
interface FileSelectorProps {
  files: FileList | null;
  setFiles: React.Dispatch<React.SetStateAction<FileList | null>>;
}

// Reusable StatsCard Component
interface StatsCardProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string | number;
  description: string;
}

// Reusable ChartCard Component
interface ChartCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}
// Reusable ActivityItem Component
interface ActivityItemProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  time: string;
}

interface UserListType {
  id: string;
  name: string;
  email: string;
  submissions: number;
  role: string;
  status: string;
  confirmationStatus: string;
}
interface ResourceListType {
  id: string;
  fullname: string;
  category: string;
  subject: string;
  createdAt: string;
  statusForm: string;
  files: string[];
  username: string | null;
}
interface ResourceType {
  fullname: string;
  email: string;
  phoneNumber: string;
  category: string;
  subject: string;
  message: string;
}
export type {
  StatsCardProps,
  ActivityItemProps,
  ChartCardProps,
  ActionOptionProps,
  FileSelectorProps,
  ResourceListType,
  UserListType,
  ResourceType,
};
