import { Table,TableHeader,TableRow,TableHead,TableBody } from "./ui/table";
import TableContent from "./TableContent";
import { useLocation } from "react-router-dom";
import UserTableContent from "./UserTableContent";


const TableSubmission = () => {
  const location=useLocation();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Upload By</TableHead>
          <TableHead>Files</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
       {location.pathname==="/submissions"? <TableContent /> : <UserTableContent/>}
      </TableBody>
    </Table>
  );
};
export default TableSubmission;