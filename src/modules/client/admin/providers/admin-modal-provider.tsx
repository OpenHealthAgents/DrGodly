"use client";

import { useEffect, useState } from "react";
import {
  CreateAppMenuItemModal,
  CreateAppModal,
  CreateOrganizationModal,
  CreatePreferenceTemplateModal,
  CreateRoleModal,
  DeleteAppMenuItemModal,
  DeleteAppModal,
  DeleteOrganizationModal,
  DeleteRoleModal,
  EditAppMenuItemModal,
  EditAppModal,
  EditOrganizationModal,
  EditRoleModal,
  ManageOrgAppsModal,
  ManageOrgMembersModal,
  ManageRoleAppMenusModal,
} from "../modals";

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
      <CreateAppMenuItemModal />
      <EditAppMenuItemModal />
      <DeleteAppMenuItemModal />
      <CreateOrganizationModal />
      <EditOrganizationModal />
      <DeleteOrganizationModal />
      <CreateRoleModal />
      <EditRoleModal />
      <DeleteRoleModal />
      <ManageOrgMembersModal />
      <ManageOrgAppsModal />
      <ManageRoleAppMenusModal />
      <CreatePreferenceTemplateModal />
    </>
  );
};
