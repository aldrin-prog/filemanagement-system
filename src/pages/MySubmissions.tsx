import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, FileText } from "lucide-react";
import TableSubmission from "@/components/TableSubmission";
import { Link } from "react-router-dom";
import { STATUS_OPTIONS,CATEGORY_OPTIONS,sanitizeInput } from "@/utils/constants";

const MySubmissions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            My Form Submissions
          </h1>
          <p className="text-muted-foreground">
            View and manage all your submitted form.
          </p>
        </div>
        <Button asChild>
            <Link to="/submit">Submit new Form</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Submissions</CardTitle>
          <CardDescription>A total of submissions received.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                placeholder="Search submissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(sanitizeInput(e.target.value))} // Use shared sanitization
                className="w-full"
                type="search"
                aria-label="Search submissions"
              />
              <Button type="submit" size="icon" variant="ghost" aria-label="Search">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]" aria-label="Filter by status">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((option: { value: string; label: string }) => (
                      <SelectItem key={option.value} value={option.value}>
                      {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                  aria-label="Filter by category"
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map((option: { value: string; label: string }) => (
                      <SelectItem key={option.value} value={option.value}>
                      {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-md border">
            <TableSubmission />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default MySubmissions;
