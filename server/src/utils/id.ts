import { nanoid } from "nanoid";

export function getNanoid(len?: number | undefined) {
    return nanoid(len);
}