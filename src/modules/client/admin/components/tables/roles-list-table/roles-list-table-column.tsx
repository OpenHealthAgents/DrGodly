import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { adminModalStore } from "@/modules/client/admin/stores/admin-modal-store";
import { TanstackTableColumnSorting } from "@/modules/shared/components/table/tanstack-table-column-sorting";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  Ellipsis,
  PencilLine,
  SquareMenu,
  Trash2,
  TriangleAlert,
  User,
} from "lucide-react";
import { TRole } from "@/modules/shared/entities/models/admin/role";

export const rolesListTableColumn: ColumnDef<TRole>[] = [
  {
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <TanstackTableColumnSorting
          label="Name"
          column={column}
          isSorted={isSorted}
        />
      );
    },
    accessorKey: "name",
  },
  {
    header: "Description",
    accessorKey: "description",
    cell: ({ row }) => {
      const desc: string = row.getValue("description");
      return (
        <p className="truncate max-w-[250px] xl:max-w-[450px]" title={desc}>
          {desc}
        </p>
      );
    },
  },
  {
    header: "App Menus",
    cell: ({ row }) => {
      const openModal = adminModalStore((state) => state.onOpen);

      const roleData = row.original;

      return (
        <Button
          className="flex items-center cursor-pointer"
          size="sm"
          variant="outline"
          onClick={() => openModal({ type: "manageRoleAppMenus", roleData })}
        >
          <SquareMenu />
        </Button>
      );
    },
  },
  {
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <TanstackTableColumnSorting
          label="Created At"
          column={column}
          isSorted={isSorted}
        />
      );
    },
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const openModal = adminModalStore((state) => state.onOpen);
      const roleData = row.original;
      const joinedDate: Date = row.getValue("createdAt");

      return (
        <div className="flex items-center justify-between gap-4">
          {format(joinedDate, "do 'of' MMM, yyyy")}
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              <Ellipsis className="font-medium" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="left">
              {/* <DropdownMenuItem className="cursor-pointer">
                <Eye />
                View
              </DropdownMenuItem> */}
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() =>
                  openModal({
                    type: "editRole",
                    roleData: { ...roleData },
                  })
                }
              >
                <PencilLine />
                Edit
              </DropdownMenuItem>
              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuItem
                className="space-x-2 cursor-pointer"
                onClick={() =>
                  openModal({
                    type: "deleteRole",
                    roleId: roleData.id,
                  })
                }
              >
                <div className="flex items-center gap-2">
                  <Trash2 />
                  Delete
                </div>
                <TriangleAlert className="text-rose-600" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
