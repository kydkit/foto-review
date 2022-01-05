import { Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import AlbumsPage from "./pages/AlbumsPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import PageNotFound from "./pages/PageNotFound";
import Navigation from "./pages/partials/Navigation";
import RequireAuth from "./components/RequireAuth";
import UploadPage from "./pages/UploadPage";

function App() {
  return (
    <>
      <Navigation />

      <Routes>
        {/* Guest Routes */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <RequireAuth redirectTo="login">
              <AlbumsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/upload"
          element={
            <RequireAuth redirectTo="login">
              <UploadPage />
            </RequireAuth>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </>
  );
}

export default App;
