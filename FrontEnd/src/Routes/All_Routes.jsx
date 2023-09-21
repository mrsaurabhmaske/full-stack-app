import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import NotesPage from "../pages/NotesPage";

function All_Routes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users/login" element={<LoginPage />} />
            <Route path="/users/register" element={<SignUpPage />} />
            <Route path="/notes/get" element={<NotesPage/> } />
        </Routes>
    )
}

export default All_Routes
