
import supertest from  'supertest';
import { app } from '../../index'; 
import { getBlogs, getBlogById } from '../../controllers/blogController';
import { connectDB } from '../../db_config/db';
describe('database connection', ()=> {
test('must open db', async ()=>{
     await connectDB();
});
})

describe('Blog Controller', () => {
  test('GET /', async () => {
    const res = await supertest(app)
      .get('/api/v1/blogs') 
      .expect(200);

    expect(res.body.status).toEqual('success');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('GET /', async () => {
    const blogId = 'some-id'; 
    const res = await supertest(app)
      .get(`/api/v1/blogs/${blogId}`) 
      .expect(200);

    expect(res.body.status).toEqual('success');
    expect(res.body.data._id).toEqual(blogId);
  });
});