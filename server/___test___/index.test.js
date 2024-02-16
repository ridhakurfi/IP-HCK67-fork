const request = require("supertest");
const app = require("../app");
const { Food, Review, Restaurant, User } = require("../models");
const resto = require("../data/resto.json");
const food = require("../data/food.json");
const review = require("../data/review.json");
const user = require("../data/user.json");
const { signer } = require("../helpers/jwtoken");

let accesstokenRandom = "kesanakemari";
let accestokenSt;
let accestokenSt2;

beforeAll(async () => {
  await Restaurant.bulkCreate(company);
  const Users = await User.bulkCreate(user);
  await Food.bulkCreate(food);
  await Review.bulkCreate(review);
  accestokenSt = signer({ id: users[1].id });
});

afterAll(async () => {
  await Restaurant.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Review.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Food.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("Home Test", () => {
  describe("Home", () => {
    test("Test Connection", async () => {
      const response = await request(app).get("/");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Halo Duniaku");
    });
  });
  describe("Login", () => {
    test("Berhasil Login, dapat token", async () => {
      const login = {
        email: "budi@gmail.com",
        password: "pass123",
      };
      const response = await request(app).post("/login").send(login);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("access_token", expect.any(String));
    });
    test("Gagal login, password salah", async () => {
      const login = {
        email: "budi@gmail.com",
        password: "",
      };
      const response = await request(app).post("/login").send(login);
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Invalid Password");
    });
    test("Gagal login, tidak ada input email", async () => {
      const login = {
        email: "",
        password: "pass123",
      };
      const response = await request(app).post("/login").send(login);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Please input email/password"
      );
    });
    test("Gagal login, tidak ada input password", async () => {
      const login = {
        email: "budi@gmail.com",
        password: "",
      };
      const response = await request(app).post("/login").send(login);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Please input email/password"
      );
    });
    test("Gagal login, User Tidak ditemukan", async () => {
      const login = {
        email: "budihaha@gmail.com",
        password: "pass123",
      };
      const response = await request(app).post("/login").send(login);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "User not Found");
    });
  });
  describe("Registreasi anggota", () => {
    test("Sukses registrasi", async () => {
      const register = {
        username: "Rudi",
        email: "rudi@gmail.com",
        password: "pass789",
        rank: "Basic",
      };
      const response = await request(app)
        .post("/register")
        .send(register)
        .set("Authorization", `Bearer ${accestokenSt}`);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("message", "Succes registered");
    });
    test("Gagal registrasi, email undefined", async () => {
      const register = {
        username: "Rudi",
        password: "pass789",
        rank: "Basic",
      };
      const response = await request(app)
        .post("/register")
        .send(register)
        .set("Authorization", `Bearer ${accestokenSt}`);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "email cannot empty");
    });
    test("Gagal registrasi, password undefined", async () => {
      const register = {
        username: "Rudi",
        email: "rudi@gmail.com",
        rank: "Basic",
      };
      const response = await request(app)
        .post("/register")
        .send(register)
        .set("Authorization", `Bearer ${accestokenSt}`);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "password is required");
    });
    test("Gagal registrasi, email kosong", async () => {
      const register = {
        username: "Rudi",
        email: "",
        password: "pass789",
        rank: "Basic",
      };
      const response = await request(app)
        .post("/register")
        .send(register)
        .set("Authorization", `Bearer ${accestokenSt}`);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "email cannot empty");
    });
    test("Gagal registrasi, password kosong", async () => {
      const register = {
        username: "Rudi",
        email: "rudi@gmail.com",
        rank: "Basic",
      };
      const response = await request(app)
        .post("/register")
        .send(register)
        .set("Authorization", `Bearer ${accestokenSt}`);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "password is required");
    });
    test("Gagal registrasi, email sudah terdaftar", async () => {
      const register = {
        username: "Rudi",
        email: "rudi@gmail.com",
        password: "pass789",
        rank: "Basic",
      };
      const response = await request(app)
        .post("/register")
        .send(register)
        .set("Authorization", `Bearer ${accestokenSt}`);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "email must be unique");
    });
  });
});
describe("Table Review dengan Token", () => {
  describe("Penarikan Data dari tabel Review", () => {
    test("Sukses Tarik Data", async () => {
      const response = await request(app)
        .get("/review")
        .set("Authorization", `Bearer ${accestokenSt}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
    });
    test("Gagal karena no Token", async () => {
      const response = await request(app).get("/review");
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Invalid Token");
    });
    test("Gagal karena token tidak valid", async () => {
      const response = await request(app)
        .get("/review")
        .set("Authorization", `Bearer ${accesstokenRandom}`);
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Invalid Token");
    });
  });
  describe("Penarikan 1 Data dari tabel Restaurant", () => {
    test("Sukses Tarik 1 Data", async () => {
      const response = await request(app)
        .get("/maps/1")
        .set("Authorization", `Bearer ${accestokenSt}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
    });
    test("Gagal karena no Token", async () => {
      const response = await request(app).get("/review/1");
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Invalid Token");
    });
    test("Gagal karena token tidak valid", async () => {
      const response = await request(app)
        .get("/review")
        .set("Authorization", `Bearer ${accesstokenRandom}`);
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Invalid Token");
    });
  });
});
describe("User Info with token", () => {
  test("Sukses Tarik Data Companies", async () => {
    const response = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${accestokenSt}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
  test("Gagal karena no Token", async () => {
    const response = await request(app).get("/user");
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });
  test("Gagal karena token tidak valid", async () => {
    const response = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${accesstokenRandom}`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });
});
