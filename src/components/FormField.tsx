import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface FormFieldProps {
  label: string;
  id: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormFiled: React.FC<FormFieldProps> = ({
  label,
  id,
  type,
  placeholder,
  defaultValue,
  handleInputChange,
}) => (
  <div className="space-y-2">
    <Label htmlFor="email">{label}</Label>
    <Input
      id={id}
      type={type}
      defaultValue={defaultValue}
      onChange={handleInputChange}
      placeholder={placeholder}
    />
  </div>
);
export default FormFiled;
