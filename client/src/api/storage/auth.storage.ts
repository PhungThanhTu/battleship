const AUTH_STORAGE_KEY = "auth_token";

const authStorage = (storage: Storage) => {
    return {
        clearAllTokens: () => {
            storage.removeItem(AUTH_STORAGE_KEY);
        },
        setAccessToken: (token: string) => {
            storage.setItem(AUTH_STORAGE_KEY, token);
        },
        getAccessToken: () => {
            return storage.getItem(AUTH_STORAGE_KEY);
        }
    };
};

export default authStorage;
