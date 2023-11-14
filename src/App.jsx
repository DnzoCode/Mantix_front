import React, { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import LoadPage from "./Components/Global/LoadPage";

const LazyUser = lazy(() => import("./pages/User/User"));
const LazyLocation = lazy(() => import("./pages/Location/Location"));
const LazyEvent = lazy(() => import("./pages/Event/Event"));
const LazyMaintenance = lazy(() => import("./pages/Maintenance/Maintenance"));
const LazyMaquina = lazy(() => import("./pages/Maquina/Maquina"));
const LazyTecnico = lazy(() => import("./pages/Tecnico/Tecnico"));

function App() {
  return (
    <>
      <AuthProvider>
        <AuthCheck />
      </AuthProvider>
    </>
  );
}

// Define un array con las rutas protegidas
const protectedRoutes = [
  { path: "/", component: <LazyUser /> },
  { path: "/users", component: <LazyUser /> },
  { path: "/tecnicos", component: <LazyTecnico /> },
  { path: "/locations", component: <LazyLocation /> },
  { path: "/calendar", component: <LazyEvent /> },
  { path: "/add/event", component: <LazyMaintenance /> },
  { path: "/maquinas", component: <LazyMaquina /> },

  // Agrega más rutas protegidas aquí
];

function getProtectedRoutes() {
  return protectedRoutes;
}
function AuthCheck() {
  const { tokenAuth } = useAuth();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          {tokenAuth ? (
            // Rutas protegidas si el token está presente
            getProtectedRoutes().map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  <Suspense fallback={<LoadPage />}>{route.component}</Suspense>
                }
              />
            ))
          ) : (
            // Rutas no protegidas o de inicio de sesión si el token no está presente
            <>
              <Route path="*" element={<Login />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

function NotFoundPage() {
  return (
    <div>
      <h1>Página no encontrada</h1>
      {/* Puedes agregar un enlace de navegación o cualquier contenido personalizado aquí */}
    </div>
  );
}
export default App;
