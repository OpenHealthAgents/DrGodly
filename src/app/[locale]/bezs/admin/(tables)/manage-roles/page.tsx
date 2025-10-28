import { RolesListTable } from "@/modules/client/admin/components/tables/roles-list-table/roles-list-table";
import { getAllRolesData } from "@/modules/client/admin/server-actions/role-actions";

const ManageRolesPage = async () => {
  const [data, error] = await getAllRolesData();

  return (
    <div className="space-y-8 mx-auto">
      <RolesListTable rolesData={data} error={error} />
    </div>
  );
};

export default ManageRolesPage;
