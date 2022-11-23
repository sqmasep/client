import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "../../../server";
import { inferRouterInputs } from "@trpc/server";
const trpc = createTRPCReact<AppRouter>({});

type a = inferRouterInputs<AppRouter>;
export default trpc;
