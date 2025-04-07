import { Label } from "@radix-ui/react-label";
import { CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import FileSelector from "./FileSelector";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadData } from "aws-amplify/storage";
import { useAppContext } from "@/context/AppContext";
import FormFiled from "./FormField";

const FormSubmission: React.FC = () => {
  const { user,addResourceMutation } = useAppContext();
  const [files, setFiles] = useState<FileList | null>(null);
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    fullname: user?.userAttributes?.name || "",
    email: user?.userAttributes?.email || "",
    phoneNumber: "",
    category: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { id, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
 
    let resFiles: Array<string> = [];
    if (files) {
      const path = user
        ? `protected/${user?.username}/`
        : `public/guest/`;
      resFiles = await Promise.all(
        Array.from(files).map(async (file) => {
          const unixTimestamp = Math.floor(Date.now() / 1000);
          return (
            await uploadData({
              path: `${path+unixTimestamp + file.name}`,
              data: file,
            }).result
          ).path;
        })
      );
    }
    await addResourceMutation.mutateAsync({
      form:formState,
      files: resFiles,
    });
    navigate(-1);
  }
  useEffect(() => {
    if(user){
      setFormState((prevState) => ({
        ...prevState,
        fullname: user?.userAttributes?.name,
        email: user?.userAttributes?.email,
      }));

    }
    setIsLoading(false);
  }, [user]);
  return (
    <form onSubmit={onSubmit}>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullname">Full Name</Label>
          <Input id="fullname" onChange={handleInputChange} defaultValue={formState.fullname} required />
        </div>

        {/* <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            defaultValue={formState.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
            required
          />
        </div> */}
        <FormFiled label="Email" id="email" type="email" defaultValue={formState.email} placeholder="john@example.com" handleInputChange={handleInputChange}/>

        {/* <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            defaultValue={formState.phoneNumber}
            placeholder="(123) 456-7890"
          />
        </div> */}
        <FormFiled label="Phone Number" type="text" id="phone" defaultValue={formState.phoneNumber} placeholder="(123) 456-7890" handleInputChange={handleInputChange}/>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select defaultValue={formState.category} name="category" onValueChange={(value) => {
            setFormState((prevState) => ({
              ...prevState,
              category: value,
            }));
          }}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Inquiry</SelectItem>
              <SelectItem value="support">Support Request</SelectItem>
              <SelectItem value="feedback">Feedback</SelectItem>
              <SelectItem value="complaint">Complaint</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
          
        {/* <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            onChange={handleInputChange}
            id="subject"
            defaultValue={formState.subject}
            placeholder="Brief description of your submission"
            required
          />
        </div> */}
        

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Please provide details about your submission..."
            className="min-h-[150px]"
            value={formState.message}
            onChange={handleInputChange}
            required
          />
        </div>
        <FileSelector files={files} setFiles={setFiles} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="button" variant="outline" onClick={() => navigate("/")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Form"}
        </Button>
      </CardFooter>
    </form>
  );
};
export default FormSubmission;
