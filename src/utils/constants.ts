const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "processed", label: "Processed" },
];

const CATEGORY_OPTIONS = [
  { value: "all", label: "All Categories" },
  { value: "General Inquiry", label: "General Inquiry" },
  { value: "Support Request", label: "Support Request" },
  { value: "Feedback", label: "Feedback" },
  { value: "Complaint", label: "Complaint" },
  { value: "Other", label: "Other" },
];

const sanitizeInput = (input: string): string => input.replace(/[^\w\s]/gi, "");

export { STATUS_OPTIONS, CATEGORY_OPTIONS, sanitizeInput };
