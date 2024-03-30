
import  {SuperTest, Request, Response} from  'supertest';
import { app } from '../../index'; 
import { connectDB } from '../../db_config/db';
import { closeDB } from '../../db_config/db';
import { Test } from 'supertest';

const request = require('supertest')(app)

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await closeDB();
});

let blogId: any = "65faa1650d0a7d15ded4deb4";


describe('Blog Controller', () => {
  it('GET /', async () => {
    const res:Response = await request.get('/api/v1/blogs');
      expect(res.status).toBe(200);

    expect(res.body.status).toEqual('success');
    expect(Array.isArray(res.body.data)).toBe(true);
  }, 10000);

  it('GET /', async () => {
    const res = await request.get(`/api/v1/blogs/${blogId}`)
      expect(res.status).toBe(200);
     

    expect(res.body.status).toEqual('success');
    expect(res.body.data._id).toEqual(blogId);
  });

});
// Test for the Comments

describe("POST a comment", () =>{
  try{
  let token : any ;
  it('responds with status 200 successs!', async () => {
    const response = await request.post("/api/v1/users/auth").send({
      email: "testUser55@gmail.com",
      password: "test@123"
    })
      expect(response.status).toBe(200);
      token = response.body.token;
    })
  it('should create a comment with status code 201' , async() =>{
    const response = await request.post(`/api/v1/blogs/${blogId}/comments`).set("Authorization", `Bearer ${token}`).send(
      {
        content: "good job",
      }
    )
    expect(response.status).toBe(201);
  })

  it('should return 401 not authorized', async()=>{
    const response = await request.post(`/api/v1/blogs/${blogId}/comments`)
    .expect(401)
    expect(response.body.status).toBe("Unauthorized")
  })

  it('should return 400 bad request if the content is empty', async() =>{
    const response = await request.post(`/api/v1/blogs/${blogId}/comments`).set("Authorization", `Bearer ${token}`)
    .send({
      content: ""
    })
  })
}
  catch(err: any){
    throw new Error(err)
  }
})

describe("GET comments", () =>{
  try{
    it('should return all the comments with status code 200', async() =>{
      const response = await request.get(`/api/v1/blogs/${blogId}/comments`);
      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
    })
    it('should return 500 server error if invalid or blogID do not exist', async() =>{
      let  nonExistingBlogId = blogId + "1" ;
      const response = await request.get(`/api/v1/blogs/${nonExistingBlogId}/comments`);    
      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Server error");
    })
  }
    catch(err: any){
      throw new Error(err)    
    }
  }
 
)


// Test for the likes

describe("POST a like on a blog", () =>{
  try{
  let token : any ;
  it('responds with status 200 successs!', async () => {
    const response = await request.post("/api/v1/users/auth").send({
      email: "testUser55@gmail.com",
      password: "test@123"
    })
    expect(response.status).toBe(200);
    token = response.body.token;
  })

  it('should return 401 not authorized', async() =>{
    const response = await request.post(`/api/v1/blogs/${blogId}/likes`)
    .expect(401)
    expect(response.body.status).toBe("Unauthorized")
  })

  it('should create a like with status code 201' , async() =>{
    const response = await request.post(`/api/v1/blogs/${blogId}/likes`).set("Authorization", `Bearer ${token}`)
    expect(response.body.status).toBe ("success")
  })
  it('should return 400 bad request if the blogId is invalid', async() =>{
    const response = await request.post(`/api/v1/blogs/${blogId + "1"}/likes`).set("Authorization", `Bearer ${token}`)
    expect(response.status).toBe(400)
  })  
}
  catch(err: any){
    throw new Error(err)
  }
})