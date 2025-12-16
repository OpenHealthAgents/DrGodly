"use client";

import { Button } from "@/components/ui/button";
import { useFileUploadStore } from "@/modules/client/shared/store/file-upload-store";
import { Upload } from "lucide-react";

function FilenestPage() {
  const openModal = useFileUploadStore((state) => state.onOpen);

  function handleOpenModal() {
    openModal({
      type: "fileUpload",
      title: "Upload Medical Documents",
      description:
        "Add reports, scans, or images. Supported formats include PDF, DOCX, DICOM, JPG, and PNG.",
    });
  }

  return (
    <div className="space-y-8 w-full">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm">Manage your health records securely</p>
      </div>
      <Button onClick={handleOpenModal}>
        <Upload />
        Upload Files
      </Button>
    </div>
  );
}

export default FilenestPage;
