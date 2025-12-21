import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Edit, Eye, Trash2, FileText } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { bytesToSize, formatSmartDate } from "@/modules/shared/helper";
import { TGetUserFilesControllerOutput } from "@/modules/server/filenest/interface-adapters/controllers/filenest";

const ListFileCard = (row: Row<TGetUserFilesControllerOutput[number]>) => {
  const file = row.original;

  return (
    <Card>
      {/* Header */}
      <CardHeader className="space-y-1">
        <div className="flex items-start gap-2 min-w-0">
          <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
          <div className="min-w-0 flex-1">
            <CardTitle
              className="text-sm font-semibold truncate"
              title={file.fileName}
            >
              {file.fileName}
            </CardTitle>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{file.fileEntity.label}</p>
      </CardHeader>

      {/* Content */}
      <CardContent className="text-sm space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Type</span>
          <span>{file.fileType}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Size</span>
          <span>{bytesToSize(file.fileSize)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Updated</span>
          <span>{formatSmartDate(file.updatedAt)}</span>
        </div>
      </CardContent>

      {/* Actions */}
      <CardFooter className="flex justify-between gap-2">
        <Button variant="outline" size="icon-sm">
          <Eye className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="icon-sm">
          <Download className="h-4 w-4" />
        </Button>

        {/* <Button variant="outline" size="icon">
          <Edit className="h-4 w-4" />
        </Button> */}

        <Button
          variant="outline"
          size="icon-sm"
          className="text-rose-600 hover:text-rose-600"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ListFileCard;
