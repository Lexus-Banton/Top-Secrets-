const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

describe('user routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST api/v1/users should create a new user', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ email: 'test@example.com', password: '123456' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'test@example.com',
    });
  });

  it('POST /api/v1/users/sessions should log in an existing user', async () => {
    // use the User Service to create a new user
    const mockUser = {
      email: 'test@example.com',
      password: '123456',
    };
    await UserService.create(mockUser);
    // log that user in
    const resp = await request(app)
      .post('/api/v1/users/sessions')
      .send(mockUser);
    // confirm that I get a 200
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({ message: 'Signed in successfully!' });
  });

  afterAll(() => {
    pool.end();
  });
});
