"use client";

import { useEffect, useState } from "react";
import {
  CreateCloudStorageModal,
  CreateFileEntityModal,
  CreateLocalStorageModal,
  DeleteCloudStorageModal,
  DeleteFileEntityModal,
  DeleteLocalStorageModal,
  EditCloudStorageModal,
  EditFileEntityModal,
  EditLocalStorageModal,
} from "../modals/admin";

export const FilenestAdminModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateCloudStorageModal />
      <EditCloudStorageModal />
      <DeleteCloudStorageModal />
      <CreateLocalStorageModal />
      <EditLocalStorageModal />
      <DeleteLocalStorageModal />
      <CreateFileEntityModal />
      <EditFileEntityModal />
      <DeleteFileEntityModal />
    </>
  );
};
