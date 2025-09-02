import PrivateRoute from "./auth/components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StoresPage from "./pages/StoresPage";
import StoreDetails from "./pages/StoreDetails";
import AdminDashboard from "./pages/AdminDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import OwnerRatings from "./pages/OwnerRatings";
import AdminUsers from "./pages/AdminUsers";
import NormalUsers from "./pages/NormalUsers";
import AllUsers from "./pages/AllUsers";
import { NewStore } from "./pages/CreateStore";
import { NewUser } from "./pages/CreateUser";

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/stores"
            element={
              <PrivateRoute roles={["user"]}>
                <StoresPage />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/stores/:id"
            element={
              <PrivateRoute roles={["user"]}>
                <StoreDetails />
              </PrivateRoute>
            }
          />

          <Route
            path="/owner"
            element={
              <PrivateRoute roles={["owner"]}>
                <OwnerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/owner/ratings"
            element={
              <PrivateRoute roles={["owner"]}>
                <OwnerRatings />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute roles={["admin"]}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/users/admins"
            element={
              <PrivateRoute roles={["admin"]}>
                <AdminUsers />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/users/regulars"
            element={
              <PrivateRoute roles={["admin"]}>
                <NormalUsers />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/users/all"
            element={
              <PrivateRoute roles={["admin"]}>
                <AllUsers />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/stores/new"
            element={
              <PrivateRoute roles={["admin"]}>
                <NewStore />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/users/new"
            element={
              <PrivateRoute roles={["admin"]}>
                <NewUser />
              </PrivateRoute>
            }
          />

        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
