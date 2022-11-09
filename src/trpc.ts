import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "../../server";

const trpc = createTRPCReact<AppRouter>();

export default trpc;
