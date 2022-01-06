import React from "react";
import { Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import PageNotFound from "./pages/PageNotFound";
import Navigation from "./pages/partials/Navigation";
import RequireAuth from "./components/RequireAuth";
import AlbumPage from "./pages/AlbumPage";

function App() {
  return (
    <>
      <Navigation />

      <Routes>
        {/* Guest Routes */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/preview/:id" element={<AlbumPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <RequireAuth redirectTo="login">
              <HomePage />
            </RequireAuth>
          }
        />
        <Route
          path="/album/:id"
          element={
            <RequireAuth redirectTo="login">
              <AlbumPage />
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
