"use client";

import { useEffect, useState } from "react";
import { CreateAppModal, DeleteAppModal, EditAppModal } from "../modals";

export const AdminModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateAppModal />
      <EditAppModal />
      <DeleteAppModal />
    </>
  );
};
