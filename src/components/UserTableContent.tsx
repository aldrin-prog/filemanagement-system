import { TableCell, TableRow } from "./ui/table";
import ActionOption from "./ActionOption";
import { format } from "date-fns";
import { Badge } from "./ui/badge";
import { useAppContext } from "@/context/AppContext";

const UserTableContent: React.FC = () => {
  const {userResources,deleteMutation}=useAppContext()
  return (
    <>
      {userResources?.map((resource: any) => (
        <TableRow key={resource.id}>
          <TableCell>{resource.fullname}</TableCell>
          <TableCell>{resource.category}</TableCell>
          <TableCell>{resource.subject}</TableCell>
          <TableCell>{format(new Date(resource.createdAt), "MM-dd-yyyy")}</TableCell>
          <TableCell>
            <Badge variant={resource.status === "pending" ? "outline" : "default"}>
              {resource.status === "pending" ? "Pending" : "Processed"}
            </Badge>
          </TableCell>
          <TableCell>{resource.username && "user" || "guest"}</TableCell>
          <TableCell>{resource.files.length}</TableCell>
          <TableCell className="text-right">
            <ActionOption id={resource.id} deleteMutation={deleteMutation} attachments={resource.files} />

          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default UserTableContent;
