/* eslint-disable import/first */
process.env.NODE_ENV = 'test';
// export const request = require('supertest')(express.expressApp());
import chai from 'chai';
import mongoose from 'mongoose';
import supertest from 'supertest';
import express from '../../server';

process.env.API_BASE = '/api/v1';

export const request = supertest(express);
export const should = chai.should();

export const expect = chai.expect;

after(async () => {
  await mongoose.connection.db.dropDatabase();
  process.exit(0);
});

export const defaultUserData = {
  email: 'arun@agiratech.com',
  firstName: 'Arun',
  lastName: 'Nattarayan',
  password: 'arun',
  userName: 'arunnattarayan',
};

export const loginWithDefaultUser = () => {
  return request.post(process.env.API_BASE + '/auth/login')
    .send({userName: defaultUserData.userName, password: defaultUserData.password})
    .expect(200)
    .expect((res) => {
      const token = res.body;
      should.exist(token);
      expect(token).to.be.a('object');
      res.body.should.have.property('token');
    });
};

export const registerDefaultUser = async () => {
  return request.post(process.env.API_BASE + '/auth/register')
    .send(defaultUserData)
    .expect(201)
    .expect((res) => {
      should.exist(res.body);
      expect(res.body).to.be.a('object');
      res.body.should.have.property('token');
    });
};
