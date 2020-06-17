require('dotenv').config();
const knex = require('knex');
const bcrypt = require('bcryptjs');
const app = require('../src/app');
const helpers = require('./test-helpers');
const { expect } = require('chai');



describe('Users Endpoints', () => {
  let db;

  const { testUsers } = helpers.makeFixtures();
  const testUser = testUsers[0];

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL
    });
    app.set('db', db);
  });

  after('disconnect from server', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));


  describe('POST /api/users', () => {
    context('User Validation', () => {
      beforeEach('insert user', () =>
        helpers.seedUsersTable(db, testUsers)
      );

      const requiredFields = ['user_name', 'password'];

      // requiredFields.forEach(field => {
      //   const registerAttemptBody = {
      //     user_name: 'test user_name',
      //     password: 'test password'
      //   };
      //   it(`Responds with 400 required error when ${field} is missing`, () => {
      //     delete registerAttemptBody[field];
      //     return supertest(app)
      //       .post('/api/users')
      //       .send(registerAttemptBody)
      //       .expect(400, {
      //         error: `Missing '${field}' in request body`,
      //       });
      //   });
      // });
    });
    context('Happy path', () => {
      it(`Responds 201, serialized User, storing bcryped password`, () => {
        const newUser = {
          user_name: 'test',
          password: 'Passwordtest3'
        };

        return supertest(app)
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect(res => {
            expect(res.body).to.have.property('id');
            expect(res.body.user_name).to.eql(newUser.user_name);
            expect(res.body).to.have.property('password');
          });
      });
    });
  });
});

describe('Meditations Endpoints', () => {
  let db;

  const { testUsers } = helpers.makeFixtures();
  const testUser = testUsers[0];
  const { testMeds } = helpers.makeFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL
    });
    app.set('db', db);
  });

  after('disconnect from server', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));


  describe('GET /api/meditations', () => {
    context('Get meditations', () => {
      beforeEach('insert meditations', () =>
        helpers.seedMeditationsTable(db, testMeds)
      );
      beforeEach('insert meditations', () =>
        helpers.seedUsersTable(db, testUsers)
      );
      context('Happy path', () => {
        it(`Responds 200, serialized Meditations`, () => {

          return supertest(app)
            .get('/api/meditations')
            .set('Authorization', helpers.makeAuthHeader(testUser))
            .expect(200)
            .expect(res => {
              expect(res.body.title);
              expect(res.body.content);
              expect(res.body.image);
            });
        });
      });
    });
  });

});

describe('Notes Endpoints', () => {
  let db;

  const { testNotes, testUsers, testMeds } = helpers.makeFixtures();

  const testUser = testUsers[0];


  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL
    });
    app.set('db', db);
  });

  after('disconnect from server', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));


  describe('GET /api/notes', () => {
    context('Get notes', () => {
      beforeEach('insert notes', () =>
        helpers.seedNotesTable(db, testNotes)
      );
      beforeEach('insert meditations', () =>
        helpers.seedMeditationsTable(db, testMeds)
      );
      beforeEach('insert users', () =>
        helpers.seedUsersTable(db, testUsers)
      );
      context('Happy path', () => {
        it(`Responds 200, serialized notes`, () => {

          return supertest(app)
            .get('/api/notes')
            .set('Authorization', helpers.makeAuthHeader(testUser))
            .expect(200)
            .expect(res => {
              expect(res.body.title);
              expect(res.body.content);
              expect(res.body.date_created);
              expect(res.body.mood_id);
              expect(res.body.user_id);
            });
        });
        it(`Responds 204, serialized notes`, () => {

          return supertest(app)
            .delete('/api/notes/1')
            .set('Authorization', helpers.makeAuthHeader(testUser))
            .expect(204)
            .expect(res => {
              expect(res);
            });
        });
      });

    });
  });
});