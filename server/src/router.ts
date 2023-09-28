import { router } from "./trpc";
import { userRouter } from "../src/user/router";

export const appRouter = router({
  user: userRouter,
});
