import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, X, File, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useSession } from "@/modules/client/auth/betterauth/auth-client";
import { useFileUploadStore } from "../../store/file-upload-store";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";

const uploadSchema = z.object({
  category: z.enum(["prescription", "lab_report", "imaging", "other"], {
    required_error: "Please select a category",
  }),
});

type FileCategory = "prescription" | "lab_report" | "imaging" | "other";

type UploadFormData = z.infer<typeof uploadSchema>;

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  key?: string;
  isDeleting: boolean;
  status: "uploading" | "complete" | "error";
  objectUrl?: string;
}

export function UploadModal() {
  const session = useSession();
  const closeModal = useFileUploadStore((state) => state.onClose);
  const modalType = useFileUploadStore((state) => state.type);
  const isOpen = useFileUploadStore((state) => state.isOpen);
  const title = useFileUploadStore((state) => state.title);
  const description = useFileUploadStore((state) => state.description);

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const isModalOpen = isOpen && modalType === "fileUpload";

  const form = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      category: undefined,
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
        id: crypto.randomUUID(),
        file,
        progress: 0,
        status: "uploading",
        isDeleting: false,
        objectUrl: URL.createObjectURL(file),
      }));

      setUploadedFiles((prev) => [...prev, ...newFiles]);

      newFiles.forEach((file) => {
        simulateUpload(file.id);
      });
    }
  }, []);

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      const tooManyFiles = fileRejections.find(
        (rejection) => rejection.errors[0].code === "too-many-files"
      );

      const fileTooLarge = fileRejections.find(
        (rejection) => rejection.errors[0].code === "file-too-large"
      );

      if (tooManyFiles) {
        toast.error("You can only upload up to 5 files at a time");
      }

      if (fileTooLarge) {
        toast.error("File size must be less than 5MB");
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles: 5,
    maxSize: 1024 * 1024 * 5, // 5MB
    accept: {
      "image/*": [],
      "application/pdf": [".pdf"],
    },
  });

  const simulateUpload = (id: string) => {
    let progress = 0;

    const interval = setInterval(() => {
      progress += Math.random() * 30;

      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.id === id
            ? {
                ...f,
                progress: Math.min(progress, 100),
                status: progress >= 100 ? "complete" : "uploading",
              }
            : f
        )
      );

      if (progress >= 100) clearInterval(interval);
    }, 200);
  };

  const removeFile = (file: UploadedFile) => {
    if (file.objectUrl) {
      URL.revokeObjectURL(file.objectUrl);
    }

    setUploadedFiles((prev) => prev.filter((f) => f.id !== file.id));
  };

  const handleSubmit = (data: UploadFormData) => {
    setUploadedFiles([]);
    form.reset();
  };

  const handleClose = () => {
    uploadedFiles.forEach(
      (f) => f.objectUrl && URL.revokeObjectURL(f.objectUrl)
    );
    setUploadedFiles([]);
    form.reset();
    closeModal();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {title || "Upload Files"}
          </DialogTitle>
          <DialogDescription>
            {description ||
              "Drag and drop files here, or browse your device to upload."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div
              className={`
                relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
                ${
                  isDragActive
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }
              `}
              {...getRootProps()}
            >
              <input
                type="file"
                multiple
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".pdf,.doc,.docx,.dcm,.jpg,.jpeg,.png"
                {...getInputProps()}
              />
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="w-7 h-7 text-primary" />
                </div>
                <div>
                  {isDragActive ? (
                    <>
                      <p className="font-medium text-primary">
                        Drop files here to upload
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Release to start uploading
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-medium text-foreground">
                        Drag and drop files here
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        or click to browse from your device
                      </p>
                    </>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Supports PDF, DOCX, DICOM, JPG, PNG (max 50MB)
                </p>
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">
                  Uploaded Files
                </p>
                <div className="space-y-2 max-h-48 overflow-auto">
                  {uploadedFiles.map((uploadedFile, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg animate-scale-in"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden">
                        {uploadedFile.status === "complete" ? (
                          uploadedFile?.objectUrl ? (
                            <img
                              src={uploadedFile.objectUrl}
                              alt={uploadedFile.id}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <CheckCircle2 className="w-5 h-5 text-success" />
                          )
                        ) : (
                          <File className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm break-all font-medium text-foreground whitespace-normal">
                          {uploadedFile.file.name}
                        </p>
                        {uploadedFile.status === "uploading" && (
                          <Progress
                            value={uploadedFile.progress}
                            className="h-1.5 mt-1.5"
                          />
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeFile(uploadedFile)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="prescription">Prescription</SelectItem>
                      <SelectItem value="lab_report">Lab Report</SelectItem>
                      <SelectItem value="imaging">
                        Imaging (X-ray, MRI, etc.)
                      </SelectItem>
                      <SelectItem value="other">
                        Other Medical Records
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 justify-end">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  uploadedFiles.length === 0 ||
                  uploadedFiles.some((f) => f.status === "uploading")
                }
              >
                Upload Files
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
