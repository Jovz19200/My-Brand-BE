import {SuperTest, Response, Request} from "supertest";
import {app} from "../../index";
import dotenv from "dotenv"
dotenv.config()
import { test, it, describe, expect, beforeAll, afterAll } from "@jest/globals";
import {connectDB }from '../../db_config/db';
import {closeDB} from '../../db_config/db';
import { Test } from "supertest";
import User from "../../models/user";

const request = require('supertest')(app);

beforeAll(async () => {
  await connectDB();
})

afterAll(async () => {
  await closeDB();
});
let token: any;

// USers Test

describe("Login /", () => {
  it('responds with status 200 successs!', async () => {
    const response = await request.post("/api/v1/users/auth").send({
      email: "gisubizo.jovan12@gmail.com",
      password: "ten10@2021"
    })

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    token = response.body.token;
})
    })

    describe("GET /", () => {
    it('responds with status 200 successs!', async () => {
      const response: Response = await request.get("/api/v1/users").set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
});


describe("POST /", () => {
    it('responds with status 201 user created!', async () => {  
      const user :any ={
        name: "Test User",
        email: "testUser55@gmail.com",
        role: "admin",
        password: "test@123"
      }
      const existingUser : any= User.findOne({email: user.email});
      console.log(existingUser.body)
      if (existingUser) {
        User.deleteOne(existingUser)
      }
      else{
      const response = await request.post("/api/v1/users").send(user);
      console.log(response.body)
      expect(response.status).toBe(201);
      }

      
 });
});


// Querries
