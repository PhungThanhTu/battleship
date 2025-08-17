import { ReactNode, createContext } from "react";
import useAuth, { AuthDefaults, AuthState } from "../hooks/auth.hook";

export interface ContextProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthState>(AuthDefaults);

export const AuthContextProvider = ({ children }: ContextProps) => {
    const value = useAuth();

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
