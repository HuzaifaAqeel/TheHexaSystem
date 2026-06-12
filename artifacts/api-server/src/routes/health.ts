import { Router, type Request, type Response } from "express";
// @ts-ignore - Vercel tsc struggles to resolve monorepo packages without tsc -b
import { HealthCheckResponse } from "@workspace/api-zod";

const router = Router();

router.get("/healthz", (_req: Request, res: Response) => {
  // @ts-ignore - Bypass potential zod parsing type issues on Vercel
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});

export default router;
