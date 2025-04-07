import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatFileSize, validateFiles } from "@/utils/fileValidation"; // Import utilities
import { FileSelectorProps } from "@/utils/propsInterface";

const FileSelector: React.FC<FileSelectorProps> = ({ files, setFiles }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles && validateFiles(selectedFiles)) {
            setFiles(selectedFiles);
        } else {
            alert("Invalid files selected.");
            setFiles(null);
        }
    };

    return (
        <div className="space-y-2">
            <Label htmlFor="files">Attachments (Optional)</Label>
            <Input id="files" type="file" multiple onChange={handleFileChange} />
            {files && files.length > 0 && (
                <div className="text-sm text-muted-foreground mt-2">
                    {Array.from(files).map((file) => (
                        <div key={file.name} className="flex items-center gap-2">
                            <span>{file.name}</span>
                            <span className="text-xs">({formatFileSize(file.size)})</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileSelector;