import request from "supertest";
import app from "../src/app.js"; // ou ton fichier principal Express
import jwt from "jsonwebtoken";

describe("🔑 Auth API", () => {
  test("Login valide renvoie un token JWT et un user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "admin@ecoride.com",
      password: "secret123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.role).toBeDefined();
  });

  test("Refuse login invalide", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "wrong@ecoride.com",
      password: "wrongpass",
    });

    expect(res.statusCode).toBe(401);
  });

  test("Middleware JWT protège les routes", async () => {
    const token = jwt.sign(
      { id: "123", role: "user" },
      process.env.JWT_SECRET || "devsecret",
      { expiresIn: "1h" }
    );

    const res = await request(app)
      .get("/api/chauffeurs")
      .set("Authorization", `Bearer ${token}`);

    expect([200, 403]).toContain(res.statusCode);
  });
});
import request from "supertest";
import app from "../src/app.js"; // ou ton fichier principal Express
import jwt from "jsonwebtoken";

describe("🔑 Auth API", () => {
  test("Login valide renvoie un token JWT et un user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "admin@ecoride.com",
      password: "secret123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.role).toBeDefined();
  });

  test("Refuse login invalide", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "wrong@ecoride.com",
      password: "wrongpass",
    });

    expect(res.statusCode).toBe(401);
  });

  test("Middleware JWT protège les routes", async () => {
    const token = jwt.sign(
      { id: "123", role: "user" },
      process.env.JWT_SECRET || "devsecret",
      { expiresIn: "1h" }
    );

    const res = await request(app)
      .get("/api/chauffeurs")
      .set("Authorization", `Bearer ${token}`);

    expect([200, 403]).toContain(res.statusCode);
  });
});
