
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



describe('Blog Controller', () => {
  it('GET /', async () => {
    const res:Response = await request.get('/api/v1/blogs');
      expect(res.status).toBe(200);

    expect(res.body.status).toEqual('success');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('GET /', async () => {
    const blogId = '65faa1650d0a7d15ded4deb4'; 
    const res = await request.get(`/api/v1/blogs/${blogId}`)
      expect(res.status).toBe(200);
     

    expect(res.body.status).toEqual('success');
    expect(res.body.data._id).toEqual(blogId);
  });

 
});