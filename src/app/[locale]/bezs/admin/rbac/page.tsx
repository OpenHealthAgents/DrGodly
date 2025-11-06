import { RBACOrgUserRoleMap } from "@/modules/client/admin/components/rbac/rbac-org-user-role-map";
import { RBACListTable } from "@/modules/client/admin/components/tables/rbac-list-table/rbac-list-table";
import { getAllOrganizationsData } from "@/modules/client/admin/server-actions/organization-actions";
import { getRbacDatas } from "@/modules/client/admin/server-actions/rbac-actions";
import { getAllRolesData } from "@/modules/client/admin/server-actions/role-actions";

const RBACPage = async () => {
  const [allOrgsData] = await getAllOrganizationsData();
  const [allRolesData] = await getAllRolesData();
  const [data, error] = await getRbacDatas();

  return (
    <div className="space-y-8 w-full">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">
          RBAC (Role Based Access Control)
        </h1>
        <p className="text-sm">
          Manage user roles and permissions across your organization to control
          access to features and data.
        </p>
      </div>
      <div className="space-y-16">
        <RBACOrgUserRoleMap
          allOrgs={allOrgsData?.organizationsData}
          allRoles={allRolesData?.roleDatas}
        />
        <RBACListTable
          error={error}
          rbacDatas={data}
          roleDatas={allRolesData?.roleDatas}
        />
      </div>
    </div>
  );
};

export default RBACPage;
