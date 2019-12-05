import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';

import factory from '../util/factories';
import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => { await truncate(); }) // this code is to clean table in each test

  it('should encrypt password when new user created', async () => {
    const user = await factory.create('User', {
      password: '123456789',
    });

    const comparePassword = await bcrypt.compare('123456789', user.password_hash);
    expect(comparePassword).toBe(true)
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('User'); // return just email, name, and password

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('not should register user with email duplicated', async () => {
    const user = await factory.attrs('User'); // return just email, name, and password

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400)
  })
});
