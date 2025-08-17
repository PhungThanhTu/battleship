import { nanoid } from "nanoid";

const NANOID_LENGTH = 5;

export function getUniqueId() {
    return nanoid(NANOID_LENGTH);
}
