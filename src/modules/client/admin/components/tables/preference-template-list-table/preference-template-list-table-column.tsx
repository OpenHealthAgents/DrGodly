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
import { TPreferenceTemplate } from "@/modules/shared/entities/models/admin/preferenceTemplete";

export const preferenceTemplateListTableColumn: ColumnDef<TPreferenceTemplate>[] =
  [
    {
      header: "Scope",
      accessorKey: "scope",
    },
    {
      header: "Country",
      accessorKey: "country",
      cell: ({ row }) => {
        const country: string = row.getValue("country");
        return <p className="text-center">{country ? country : "-"}</p>;
      },
    },
    {
      header: ({ column }) => {
        const isSorted = column.getIsSorted();

        return (
          <TanstackTableColumnSorting
            label="Timezone"
            column={column}
            isSorted={isSorted}
          />
        );
      },
      accessorKey: "timezone",
    },
    {
      header: "Date Format",
      accessorKey: "dateFormat",
    },
    {
      header: ({ column }) => {
        const isSorted = column.getIsSorted();

        return (
          <TanstackTableColumnSorting
            label="Currency"
            column={column}
            isSorted={isSorted}
          />
        );
      },
      accessorKey: "currency",
    },
    {
      header: "Number Format",
      accessorKey: "numberFormat",
    },
    {
      header: "Week Start Day",
      accessorKey: "weekStart",
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

        const { id } = row.original;
        const data = row.original;
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
                  onClick={() => openModal({ type: "editPreferenceTemplate" })}
                >
                  <PencilLine />
                  Edit
                </DropdownMenuItem>
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuItem
                  className="space-x-2 cursor-pointer"
                  onClick={() =>
                    openModal({ type: "deletePreferenceTemplate" })
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
