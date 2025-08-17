import React from "react";
import ReactDOM from "react-dom/client";

import App from "./app.tsx";
import { AuthContextProvider } from "./contexts/auth.context.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </React.StrictMode>
);
