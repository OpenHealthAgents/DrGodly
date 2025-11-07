"server-only";

import { redirect } from "@/i18n/navigation";
import { getServerSession } from "@/modules/server/auth/betterauth/auth-server";
import { getSharedInjection } from "@/modules/server/shared/di/container";
import { getLocale } from "next-intl/server";
import { revalidatePath } from "next/cache";
import {
  InputParseError,
  OperationError,
} from "../entities/errors/commonError";
import { ZSAError } from "zsa";

function isNextJsControlError(error: any) {
  return (
    error?.digest === "NEXT_REDIRECT" || error?.digest === "NEXT_NOT_FOUND"
  );
}

export async function withMonitoring<T>(
  name: string,
  handler: () => Promise<T>,
  options?: {
    url?: string;
    revalidatePath?: boolean;
    redirect?: boolean;
    operationErrorMessage?: string;
  }
): Promise<T> {
  const monitoringService = getSharedInjection("IMonitoringService");
  const locale = await getLocale();

  return monitoringService.instrumentServerAction(
    name,
    { op: "server.action" },
    async () => {
      const session = await getServerSession();

      if (session?.user) {
        monitoringService.setUser({
          id: session.user.id,
          email: session.user.email,
          username: session.user?.username ?? undefined,
        });
      }

      let data: T;

      try {
        data = await handler();
      } catch (err) {
        if (!isNextJsControlError(err)) {
          monitoringService.report(err);
        }

        if (err instanceof InputParseError) {
          throw new ZSAError("INPUT_PARSE_ERROR", err.cause);
        }

        if (err instanceof OperationError) {
          throw new ZSAError(
            "ERROR",
            options?.operationErrorMessage ?? "Failed to perform operation."
          );
        }

        throw new ZSAError("ERROR", err);
      } finally {
        monitoringService.clearUser();
      }

      if (options?.url) {
        if (options?.revalidatePath) revalidatePath(options.url);
        if (options?.redirect) redirect({ href: options.url, locale });
      }

      return data;
    }
  );
}
