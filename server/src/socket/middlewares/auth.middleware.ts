import { AxiosError, HttpStatusCode } from "axios";
import { SocketMiddlewareAsync } from "./middlewares.type";
import { Socket } from "socket.io";
import { UserProfile, getProfile } from "../../api/auth.api";

export const AuthMiddleware: SocketMiddlewareAsync = async (socket, next) => {
  const isHandshake = socket.handshake.query?.token;

  if (!isHandshake)
    return next(new Error("Authentication error"));
  
  const token = socket.handshake.query.token;

  try {
  
    const profile = await getProfile(token as string);
  
    (socket as AuthenticatedSocket).user = profile;

    return next();
  
  } catch (error: unknown) {
    if(error instanceof AxiosError && error.response?.status === HttpStatusCode.Unauthorized) return next(new UnauthorizedSocketError("Unauthorized"));
    return next(error as Error);
  }

}

export function getPlayerIdFromSocket(socket: AuthenticatedSocket) {
  return socket.user.username;
}

export class UnauthorizedSocketError extends Error {}

export type AuthenticatedSocket = Socket & { user: UserProfile }