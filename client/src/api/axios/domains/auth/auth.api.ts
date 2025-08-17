import { HttpStatusCode } from "axios";
import authStorage from "../../../storage/auth.local-storage";
import protectedApi from "../../instances/private.axios";
import publicApi from "../../instances/public.axios";
import { UserProfileDto } from "../../../../dtos/profile.dto";

const PATH_AREA = "auth";

const PathActions = {
    AUTHORIZE: "/authorize",
    PROFILE: "/profile"
};

export async function getProfile(): Promise<UserProfileDto> {
    const response = await protectedApi.get<UserProfileDto>(getActionUrl(PathActions.PROFILE));
    return response.data;
}

export async function authorizeAndStoreToken(user: UserProfileDto): Promise<string> {
    const token = await authorize(user);

    if (!token) throw new Error("Get token failed");

    authStorage.setAccessToken(token);
    return token;
}

export function logout() {
    authStorage.clearAllTokens();
}

async function authorize(user: UserProfileDto): Promise<string> {
    const response = await publicApi.post<Credential>(getActionUrl(PathActions.AUTHORIZE), user);
    if (response.status !== HttpStatusCode.Created) {
        throw new Error(`Get token failed, code ${response.status}`);
    }
    return response.data.token;
}

export type Credential = {
    token: string;
};

function getActionUrl(action: string) {
    return `${PATH_AREA}${action}`;
}
