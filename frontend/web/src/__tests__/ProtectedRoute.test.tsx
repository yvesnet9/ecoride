import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

beforeEach(() => localStorage.clear());

test("redirige vers /login sans token", () => {
  render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <ProtectedRoute requiredRole="user">
        <div>Dashboard</div>
      </ProtectedRoute>
    </MemoryRouter>
  );
  expect(screen.queryByText("Dashboard")).toBeNull();
});

test("redirige vers / si rôle non autorisé", () => {
  localStorage.setItem("token", "fake");
  localStorage.setItem("user", JSON.stringify({ role: "user" }));

  render(
    <MemoryRouter initialEntries={["/admin/dashboard"]}>
      <ProtectedRoute requiredRole="admin">
        <div>Admin</div>
      </ProtectedRoute>
    </MemoryRouter>
  );
  expect(screen.queryByText("Admin")).toBeNull();
});

test("affiche le contenu si rôle autorisé", () => {
  localStorage.setItem("token", "fake");
  localStorage.setItem("user", JSON.stringify({ role: "admin" }));

  render(
    <MemoryRouter initialEntries={["/admin/dashboard"]}>
      <ProtectedRoute requiredRole="admin">
        <div>Admin</div>
      </ProtectedRoute>
    </MemoryRouter>
  );
  expect(screen.getByText("Admin")).toBeInTheDocument();
});
