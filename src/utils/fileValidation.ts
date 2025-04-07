const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];

const formatFileSize = (size: number): string => {
    return `${(size / 1024).toFixed(2)} KB`;
};

const validateFiles = (files: FileList): boolean => {
    return Array.from(files).every(
        (file) =>
            ACCEPTED_FILE_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE
    );
};
export {formatFileSize, validateFiles};