import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import FormSubmission from "@/components/FormSubmission";

export default function Submit() {
  return (
    <div className="py-10">
      <div className="mb-8">
        <Link to="/" className="text-sm underline mb-4 inline-block">
          Back to home
        </Link>
        <h1 className="text-3xl font-bold">Submit a Form</h1>
        <p className="text-muted-foreground mt-2">
          Fill out the form below to submit your request. You can attach files
          if needed.
        </p>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Form Submission</CardTitle>
          <CardDescription>
            Please provide all required information and any relevant files.
          </CardDescription>
        </CardHeader>
        <FormSubmission />
      </Card>
    </div>
  );
}
