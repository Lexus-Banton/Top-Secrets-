const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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

  afterAll(() => {
    pool.end();
  });
});
