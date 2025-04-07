import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Submit from "./pages/Submit";
import RegisterUser from "./pages/RegisterUser";
import Submissions from "./pages/Submissions";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import MySubmissions from "./pages/MySubmissions";
import UsersPage from "./pages/UsersPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import NewPasswordPage from "./pages/NewPasswordPage";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/unauthorized" element={<UnauthorizedPage/>} />
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/new-password" element={<NewPasswordPage/>}/>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute  allowedRoles={["admin", "user"]}>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-submissions"
          element={
            <ProtectedRoute allowedRoles={["admin", "user"]}>
              <MainLayout>
                <MySubmissions />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/submissions"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <MainLayout>
                <Submissions />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/users" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <MainLayout>
              <UsersPage/>
            </MainLayout>
          </ProtectedRoute>
        }/>
      </Routes>
    </Router>
  );
};
export default App;
