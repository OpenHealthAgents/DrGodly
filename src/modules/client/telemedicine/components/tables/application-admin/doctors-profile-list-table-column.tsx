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
import { Link } from "@/i18n/navigation";
import { TDoctor } from "@/modules/shared/entities/models/telemedicine/doctorProfile";
import { Badge } from "@/components/ui/badge";

export const doctorsProfileListTableColumn = (
  t: (key: string) => string
): ColumnDef<TDoctor>[] => [
  {
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <TanstackTableColumnSorting
          label="Doctor Id"
          column={column}
          isSorted={isSorted}
        />
      );
    },
    accessorKey: "doctorId",
  },
  {
    header: "Status",
    accessorKey: "isCompleted",
    cell: ({ row }) => {
      const isCompleted: boolean = row.getValue("isCompleted");
      return (
        <Badge
          className={cn(
            isCompleted ? "bg-green-400 text-black" : "bg-orange-400 text-white"
          )}
        >
          {isCompleted ? "Completed" : "Pending"}
        </Badge>
      );
    },
  },
  {
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <TanstackTableColumnSorting
          label={t("table.columns.createdAt")}
          column={column}
          isSorted={isSorted}
        />
      );
    },
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const openModal = adminModalStore((state) => state.onOpen);
      const joinedDate: Date = row.getValue("createdAt");

      const id = row.original.id;

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
              <DropdownMenuItem className="cursor-pointer">
                <Link
                  href={`/bezs/telemedicine/admin/manage-doctors/edit?id=${id}`}
                  className="flex items-center"
                >
                  <PencilLine />
                  {t("table.actions.edit")}
                </Link>
              </DropdownMenuItem>
              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuItem
                className="space-x-2 cursor-pointer"
                onClick={() => {}}
              >
                <div className="flex items-center gap-2">
                  <Trash2 />
                  {t("table.actions.delete")}
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
