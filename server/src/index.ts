import { z } from "zod";
import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";
import { appRouter } from "./router";

// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

const app = express();

app.use(cors()); // 모든 도메인에서의 접근을 허용합니다. 실제 배포시에는 조심스럽게 설정해야 합니다.

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
app.listen(3000);

// export type definition of API
export type AppRouter = typeof appRouter;
