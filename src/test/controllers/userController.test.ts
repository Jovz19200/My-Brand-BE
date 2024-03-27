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

let queryId: any;
// USers Test


describe("Login /", () => {
  it('responds with status 200 successs!', async () => {
    const response = await request.post("/api/v1/users/auth").send({
      email: "testUser55@gmail.com",
      password: "test@123"
    })

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    token = response.body.token;
})
    })

    describe("GET / all users", () => {
    it('responds with status 401 user not signed in!', async () => {
      const response: Response = await request.get("/api/v1/users");
      expect(response.status).toBe(401);
      expect(response.body.status).toBe("Unauthorized")
    })

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
      
      if (existingUser) {
        User.deleteOne(existingUser)
      }
      else{
      const response = await request.post("/api/v1/users").send(user);
      expect(response.status).toBe(201);

      }

      
 });
});

describe("GET user by id", () => {
  const user_id = "65fc1fa2fcd6fdd9f2322cdf"
  let nonAdminToken: any;
  it('responds with  not authorized', async ()=>{
    const response = await request.get(`/api/v1/users/`);
    expect(response.status).toBe(401);
  })

  it('responds with status 200 successs!', async () => {
    const response = await request.post("/api/v1/users/auth").send({
      email: "mugisha@gmail.com",
      password: "123qwe"
    }, 10000)
    nonAdminToken = response.body.token;
  })

  it('should return Unauthorized for non admin user', async () => {
    
    const response = await request.get(`/api/v1/users/${user_id}`).set('Authorization', `Bearer ${nonAdminToken}`);
    expect(response.status).toBe(401);  
    expect(response.body.status).toBe("Unauthorized");
  })

  it('should return user with status 200', async () => {

    const response = await request.get(`/api/v1/users/${user_id}`).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
  })
})


// Querries


describe("POST a query", () => {
  it('responds with status 201 query created!', async () => {
    const response = await request.post("/api/v1/queries").send({
      name: "Test User",
      email: "gisubizo.jovan@gmail.com",
      message: "I have a question"
    })
    
    expect(response.status).toBe(201);
    queryId = response.body.data._id;
    })

  it('responds with status 400 query not created for skipped input!', async () => {
    const response = await request.post("/api/v1/queries").send({
      name: "Test User",
      email: "",
      message: "I have a question"})

    expect(response.status).toBe(400);
  })
})

describe("GET all queries", () => {
  it('responds with status 200 successs!', async () => {
    const response = await request.get("/api/v1/queries").set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});

it('should return 401 if no user signed in', async () => {
  const response = await request.get("/api/v1/queries");
  expect(response.status).toBe(401);
});


describe("DELETE a query", () => {
  it('delete a query with status 204', async () =>{
    const response  = await request.delete(`/api/v1/queries/${queryId}`).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(204);
    
  })
  
})


