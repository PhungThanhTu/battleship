import { SocketMiddlewareAsync } from "./middlewares.type";
import { AuthMiddleware } from "./auth.middleware";
import { IoWrapper } from "../../wrappers/io.wrapper";

const MIDDLEWARES: SocketMiddlewareAsync[] = [
  AuthMiddleware
];

export function applySocketMiddleware(io: IoWrapper) {
  for (const middleware of MIDDLEWARES) {
    io.use(middleware);
  }
}