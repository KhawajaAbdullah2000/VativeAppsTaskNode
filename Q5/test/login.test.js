
const request = require('supertest');
const app = require('../server'); 

describe('Login API', () => {
  it('should return 200 and success message for valid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'user1', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Login successful');
  });

  it('should return 401 for invalid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'user1', password: 'wrongpassword' });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });

  it('should return 400 for missing fields', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'user1' }); 
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Username and password are required');
  });
});
