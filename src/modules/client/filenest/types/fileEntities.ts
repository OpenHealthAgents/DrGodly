import { TGetFileEntitiesControllerOutput } from "@/modules/server/filenest/interface-adapters/controllers/fileEntity";
import { ZSAError } from "zsa";

export interface IFileEntitiesProps {
  fileEntities: TGetFileEntitiesControllerOutput | null;
  error: ZSAError | null;
}

export type TFileEntity = TGetFileEntitiesControllerOutput[number];
