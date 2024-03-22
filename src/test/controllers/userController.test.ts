import supertest from "supertest";
import {app} from "../../index";
import dotenv from "dotenv"
dotenv.config()
import { test, it, describe, expect, beforeAll, afterAll } from "@jest/globals";
import {connectDB }from '../../db_config/db';
import {closeDB} from '../../db_config/db';

describe('Database Connection', () => {
    test('should connect to the database', async () => {
        await connectDB();
    });
});

afterAll(async () => {
  closeDB();
});
describe("GET /", () => {
    test('responds with status 200 successs!', async () => {
      const response = await supertest(app).get("/api/v1/users");
      expect(response.status).toBe(200);
    });
});

describe("POST /", () => {
    test('responds with status 201 user created!', async () => {
      const response = await supertest(app).post("/api/v1/users").send({
        name: "Test User",
        email: "testUser5@gmail.com",
        role: "admin",
        password: "test@123"
      });
      expect(response.status).toBe(201);
 });
});