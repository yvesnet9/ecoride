// 🌿 src/components/ProtectedRoute.tsx – Protection des routes EcoRide
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: "user" | "admin";
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user } = useContext(UserContext);

  // �� Pendant le chargement initial (avant que le contexte soit défini)
  if (user === undefined) {
    return <div className="text-center mt-20 text-gray-500">Chargement...</div>;
  }

  // 🚫 Si aucun utilisateur connecté
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 Si le rôle ne correspond pas
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // ✅ Sinon, on affiche la page protégée
  return children;
}

