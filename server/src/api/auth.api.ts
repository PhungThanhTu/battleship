import publicApi from "./instances/public.axios";

export async function getProfile(token: string) {
    const config = getConfigWithTokenHeader(token);
    const response = await publicApi.get<UserProfile>('/auth/profile', config);
    return response.data;
}

function getConfigWithTokenHeader(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

export interface UserProfile {
  username: string;
}
