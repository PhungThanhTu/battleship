import { useCallback, useEffect, useMemo, useState } from "react";
import { UserProfileDto } from "../dtos/profile.dto";
import { authorizeAndStoreToken, getProfile, logout } from "../api/axios/domains/auth/auth.api";

function useAuth() {
    const [profile, setProfile] = useState<UserProfileDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const login = useCallback(async (username: string): Promise<void> => {
        try {
            await authorizeAndStoreToken({ username });
            setLoading(true);
        } catch {
            logout();
        }
    }, []);

    const logOut = useCallback(() => {
        window.location.reload();
        logout();
        setLoading(true);
    }, []);

    useEffect(() => {
        let ignore = false; // References: https://react.dev/reference/react/useEffect#fetching-data-with-effects
        async function tryGetProfile() {
            if (!loading) return;

            try {
                const newProfile = await getProfile();
                if (!ignore) setProfile(newProfile);
            } catch {
                if (!ignore) setProfile(null);
            } finally {
                if (!ignore) setLoading(false);
            }
        }
        tryGetProfile();
        return () => {
            ignore = true;
        };
    }, [loading]);

    const value = useMemo(() => {
        return {
            loading,
            profile,
            login,
            logOut
        };
    }, [loading, profile, login, logOut]);

    return value;
}
export interface AuthState {
    loading: boolean;
    profile: UserProfileDto | null;
    login: (username: string) => Promise<void>;
    logOut: () => void;
}

export const AuthDefaults: AuthState = {
    profile: null,
    loading: true,
    login: async () => Promise.resolve(),
    logOut: () => {}
};

export default useAuth;
