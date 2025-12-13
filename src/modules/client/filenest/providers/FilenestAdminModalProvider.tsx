"use client";

import { useEffect, useState } from "react";
import {
  CreateCloudStorageModal,
  CreateLocalStorageModal,
  DeleteCloudStorageModal,
  DeleteLocalStorageModal,
  EditCloudStorageModal,
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
    </>
  );
};
