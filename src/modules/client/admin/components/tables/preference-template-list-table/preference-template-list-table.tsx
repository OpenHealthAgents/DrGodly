"use client";

import DataTable from "@/modules/shared/components/table/data-table";
import { TPreferenceTemplates } from "@/modules/shared/entities/models/admin/preferenceTemplete";
import { ZSAError } from "zsa";
import { useAdminModalStore } from "../../../stores/admin-modal-store";
import { preferenceTemplateListTableColumn } from "./preference-template-list-table-column";

type IPreferenceTemplateListTable = {
  preferenceTemplateDatas: TPreferenceTemplates | null;
  error: ZSAError | null;
};

export const PreferenceTemplateListTable = ({
  preferenceTemplateDatas,
  error,
}: IPreferenceTemplateListTable) => {
  const openModal = useAdminModalStore((state) => state.onOpen);

  return (
    <div className="space-y-8 w-full">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Manage Preference Templates</h1>
        <p className="text-sm">
          Manage default preference templates for different countries.
        </p>
      </div>
      <DataTable
        columns={preferenceTemplateListTableColumn}
        data={preferenceTemplateDatas?.preferenceTemplates ?? []}
        dataSize={preferenceTemplateDatas?.total}
        label="All Preference Templates"
        addLabelName="Add Preference Template"
        searchField="country"
        error={(!preferenceTemplateDatas && error?.message) || null}
        fallbackText={
          (error && error.message) ||
          (preferenceTemplateDatas?.preferenceTemplates?.length === 0 &&
            "No Preference Templates") ||
          undefined
        }
        //   filterField="type"
        //   filterValues={typeFilteredData}
        openModal={() =>
          openModal({
            type: "addPreferenceTemplate",
          })
        }
      />
    </div>
  );
};
