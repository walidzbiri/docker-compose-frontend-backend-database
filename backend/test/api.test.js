/* eslint-disable no-undef */
const request = require('supertest');
const { expect } = require('chai');
const knex = require('../db/connection');
const app = require('../app');
const fixtures = require('./fixtures');

// eslint-disable-next-line no-undef
describe('CRUD api', () => {
  // running before each testing
  before((done) => {
    // running migrations
    knex.migrate.latest()
      .then(() =>/* Running seeds */ knex.seed.run())
      .then(() => {
        // migrations are finished
        done();
      });
  });

  it('Lists all stickers', (done) => {
    request(app)// using super-test to test API
      .get('/api/v1/stickers')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('array');// chai assertions
        expect(response.body).to.deep.equal(fixtures);
        done();
      });
  });

  it('Lists a sticker by id', (done) => {
    request(app)// using super-test to test API
      .get('/api/v1/stickers/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');// chai assertions
        expect(response.body).to.deep.equal(fixtures[0]);
        done();
      });
  });

  const sticker = {
    title: 'GIT control',
    description: 'git for version control logo',
    rating: 7,
    url: 'http://devstickers.com/assets/img/pro/4mh6.png',
  };

  it('Creates a record', (done) => {
    request(app)
      .post('/api/v1/stickers')
      .send(sticker)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal({
          message: 'sticker created',
        });
        done();
      });
  });

  it('Update a record', (done) => {
    request(app)
      .put('/api/v1/stickers/1')
      .send(sticker)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal({
          id: 1, ...sticker,
        });
        done();
      });
  });

  it('Delete a record', (done) => {
    request(app)
      .delete('/api/v1/stickers/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal({
          message: 'sticker deleted',
        });
        done();
      });
  });
});
