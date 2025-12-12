import LocalStorageTable from "@/modules/client/filenest/components/admin/local-storage/LocalStorageTable";

function CloudStoragePage() {
  return (
    <div className="space-y-8 w-full">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Local Storage</h1>
        <p className="text-sm">Manage local storage configurations</p>
      </div>
      <LocalStorageTable />
    </div>
  );
}

export default CloudStoragePage;
