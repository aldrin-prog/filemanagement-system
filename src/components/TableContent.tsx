import { TableCell, TableRow } from "./ui/table";
import ActionOption from "./ActionOption";
import { format } from "date-fns";
import { Badge } from "./ui/badge";
import { useAppContext } from "@/context/AppContext";
import { ResourceListType } from "@/utils/propsInterface";

const TableContent: React.FC = () => {
  const { resources, deleteMutation } = useAppContext();
  
  return (
    <>
      {resources?.map((resource:ResourceListType) => (
        <TableRow key={resource?.id}>
          <TableCell>{resource.fullname}</TableCell>
          <TableCell>{resource.category}</TableCell>
          <TableCell>{resource.subject}</TableCell>
          <TableCell>
            {format(new Date(resource.createdAt), "MM-dd-yyyy")}
          </TableCell>
          <TableCell>
            <Badge
              variant={resource.statusForm === "pending" ? "outline" : "default"}
            >
              {resource.statusForm === "pending" ? "Pending" : "Processed"}
            </Badge>
          </TableCell>
          <TableCell>{(resource.fullname && "user") || "guest"}</TableCell>
          <TableCell>{resource.files.length}</TableCell>
          <TableCell className="text-right">
            <ActionOption
            resource={resource}
              deleteMutation={deleteMutation}
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default TableContent;
