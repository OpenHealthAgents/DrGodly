import { AppsListTable } from "@/modules/client/admin/components/tables/apps-list-table/apps-list-table";
import { getAllAppsData } from "@/modules/client/admin/server-actions/app-actions";

const ManageAppsPage = async () => {
  const [data, error] = await getAllAppsData();

  return (
    <div className="space-y-8 mx-auto">
      <AppsListTable appDatas={data} error={error} />
    </div>
  );
};

export default ManageAppsPage;
