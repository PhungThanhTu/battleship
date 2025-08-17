import { getNowTimestamp } from "./time.utils";

export function logWithTime(message?: unknown, ...optionalParams: unknown[]) {
    console.log(`[${getNowTimestamp()}]`, message, ...optionalParams);
}
