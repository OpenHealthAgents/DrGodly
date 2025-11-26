"use client";

import { useEffect, useState } from "react";
import {
  CreateDoctorServiceModal,
  DeleteDoctorServiceModal,
} from "../modals/doctor";

export const DoctorModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateDoctorServiceModal />
      <DeleteDoctorServiceModal />
    </>
  );
};
