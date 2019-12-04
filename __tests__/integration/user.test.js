import request from 'supertest';
import app from '../../src/app';
import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async ()=>{
    await truncate()
  })
  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Maria',
        email: 'maria@gmail.com',
        password_hash: '123456789',
      });
    expect(response.body).toHaveProperty('id');
  });

  it('not should register user with email duplicated', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'João',
        email: 'joao@gmail.com',
        password_hash: '123456789',
      });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'João',
        email: 'joao@gmail.com',
        password_hash: '123456789',
      });

    expect(response.status).toBe(400)
  })
});
