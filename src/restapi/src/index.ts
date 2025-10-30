import { Hono } from "hono";
import { serve } from "@hono/node-server";
import {
  getAppsController,
  deleteAppController,
  updateAppController,
  createAppController,
} from "../../modules/server/admin/interface-adapters/controllers/app";
import {
  InputParseError,
  OperationError,
} from "../../modules/shared/entities/errors/commonError";
import {
  TCreateAppForm,
  TUpdateAppValidationSchema,
} from "../../modules/shared/schemas/admin/appValidationSchema";

const app = new Hono();

app.get("/", (c) => c.text("Hono backend is running 🚀"));
app.get("/health", (c) => c.json({ ok: true }));

app.get("/admin/get-apps", async (c) => {
  try {
    const appsdata = await getAppsController();
    return c.json(appsdata);
  } catch (err) {
    console.log(err);
    if (err instanceof InputParseError) {
      return c.json({ error: err.message }, 500);
    }

    if (err instanceof OperationError) {
      return c.json({ error: "Failed to get apps." }, 500);
    }

    return c.json({ error: (err as Error).message }, 500);
  }
});

app.post("/admin/create-app", async (c) => {
  try {
    const body: TCreateAppForm = await c.req.json();
    const appsdata = await createAppController(body);
    return c.json(appsdata);
  } catch (err) {
    console.log(err);
    if (err instanceof InputParseError) {
      return c.json({ error: err.message }, 500);
    }

    if (err instanceof OperationError) {
      return c.json({ error: "Failed to get apps." }, 500);
    }

    return c.json({ error: (err as Error).message }, 500);
  }
});

app.post("/admin/update-app", async (c) => {
  try {
    const body: TUpdateAppValidationSchema = await c.req.json();
    const appsdata = await updateAppController(body);
    return c.json(appsdata);
  } catch (err) {
    console.log(err);
    if (err instanceof InputParseError) {
      return c.json({ error: err.message }, 500);
    }

    if (err instanceof OperationError) {
      return c.json({ error: "Failed to get apps." }, 500);
    }

    return c.json({ error: (err as Error).message }, 500);
  }
});

app.post("/admin/delete-app", async (c) => {
  try {
    const body: { id: string } = await c.req.json();
    const appsdata = await deleteAppController(body);
    return c.json(appsdata);
  } catch (err) {
    console.log(err);

    if (err instanceof InputParseError) {
      return c.json({ error: err.message }, 500);
    }

    if (err instanceof OperationError) {
      return c.json({ error: "Failed to get apps." }, 500);
    }

    return c.json({ error: (err as Error).message }, 500);
  }
});

serve({
  fetch: app.fetch,
  port: 4000,
});

console.log("✅ Hono server running at http://localhost:4000");
