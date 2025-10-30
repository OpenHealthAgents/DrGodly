import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { adminModalStore } from "@/modules/client/admin/stores/admin-modal-store";
import { TanstackTableColumnSorting } from "@/modules/shared/components/table/tanstack-table-column-sorting";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  Ellipsis,
  Eye,
  Lock,
  PencilLine,
  SquareMenu,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { TAppsListTableColumn } from "@/modules/shared/entities/models/admin/app";

export const appsListTableColumn: ColumnDef<TAppsListTableColumn>[] = [
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
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <TanstackTableColumnSorting
          label="Slug"
          column={column}
          isSorted={isSorted}
        />
      );
    },
    accessorKey: "slug",
  },
  {
    header: "Type",
    accessorKey: "type",
  },
  {
    header: "Menu Items",
    cell: ({ row }) => {
      type CountType = {
        appMenuItems: number;
        appActions: number;
      };

      const count: CountType = row.original._count;
      const appId = row.original.id;

      return (
        <div>
          <Link
            href={`/bezs/admin/manage-apps/manage-menus?appId=${appId}`}
            className={cn(
              buttonVariants({ size: "sm", variant: "outline" }),
              "flex items-center cursor-pointer w-fit"
            )}
          >
            <SquareMenu /> ({count.appMenuItems})
          </Link>
        </div>
      );
    },
  },
  // {
  //   header: "Actions",
  //   cell: ({ row }) => {
  //     type CountType = {
  //       appMenuItems: number;
  //       appActions: number;
  //     };

  //     const count: CountType = row.original._count;
  //     const appId = row.original.id;

  //     return (
  //       <div>
  //         <Link
  //           href={`/bezs/admin/manage-apps/manage-actions?appId=${appId}`}
  //           className={cn(
  //             buttonVariants({ size: "sm", variant: "outline" }),
  //             "flex items-center cursor-pointer w-fit"
  //           )}
  //         >
  //           <Lock /> ({count.appActions})
  //         </Link>
  //       </div>
  //     );
  //   },
  // },
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

      const appId: string | undefined = row.original.id;
      const appData = row.original;
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
                onClick={() => openModal({ type: "editApp", appData })}
              >
                <PencilLine />
                Edit
              </DropdownMenuItem>
              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuItem
                className="space-x-2 cursor-pointer"
                onClick={() => openModal({ type: "deleteApp", appId })}
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
