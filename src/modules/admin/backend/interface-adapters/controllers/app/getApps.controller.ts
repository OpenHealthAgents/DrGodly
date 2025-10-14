import { AppDatas } from "../../../entities/models/app";
import { getAppsUseCase } from "../../../application/useCases/app/getApps.useCase";

function presenter(appDatas: AppDatas) {
  return appDatas;
}

export type GetAppsControllerOutputType = ReturnType<typeof presenter>;

export async function getAppsController(): Promise<GetAppsControllerOutputType> {
  const appDatas = await getAppsUseCase();
  return presenter(appDatas);
}
