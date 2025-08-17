import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login.page";
import AuthorizedRoute from "./routes/authorized.route";
import DashboardPage from "./pages/dashboard.page";
import RoomPage from "./pages/room.page";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<AuthorizedRoute />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="/room/:roomId?" element={<RoomPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
