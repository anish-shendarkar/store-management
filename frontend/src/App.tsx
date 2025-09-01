import PrivateRoute from "./auth/components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StoresPage from "./pages/StoresPage";
import StoreDetails from "./pages/StoreDetails";

function App() {

  return (
      <AuthProvider>
        <Router>
          <Routes>
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
              path="/stores/:storeId"
              element={
                <StoreDetails />
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

            {/* <Route
            path="/owner"
            element={
              <PrivateRoute roles={["owner"]}>
                <OwnerDashboard />
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
          /> */}
          </Routes>
        </Router>
      </AuthProvider>
  )
}

export default App
