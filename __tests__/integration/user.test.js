import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';

import User from '../../src/app/models/User';
import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {await truncate();}) // this code is to clean table in each test

  it('should encrypt password when new user created', async () => {
    const user = await User.create({
      name: 'Maria',
      email: 'maria@gmail.com',
      password: '123456789',
    });
    const comparePassword  = await bcrypt.compare('123456789', user.password_hash);
    expect(comparePassword).toBe(true)
  });

  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Maria',
        email: 'maria@gmail.com',
        password: '123456789',
      });
    expect(response.body).toHaveProperty('id');
  });

  it('not should register user with email duplicated', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'João',
        email: 'joao@gmail.com',
        password: '123456789',
      });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'João',
        email: 'joao@gmail.com',
        password: '123456789',
      });

    expect(response.status).toBe(400)
  })
});
