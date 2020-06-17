const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'dunder',
      password: 'password',

    },
    {
      id: 2,
      user_name: 'b.deboop',
      password: 'password',

    },
    {
      id: 3,
      user_name: 'c.bloggs',
      password: 'password',

    },
  ];
}
function makeMeditationsArray() {
  return [
    {
      id: 1,
      title: "Title 1",
      content: "tests1"
    },
    {
      id: 2,
      title: "Title 2",
      content: "tests2"
    },
    {
      id: 3,
      title: "Title 3",
      content: "tests3"
    },
  ]
}
function makeNotesArray() {
  return [
    {
      id: 1,
      title: "Title 1",
      content: "tests1",

      mood_id: 1,
      user_id: 1
    },
    {
      id: 2,
      title: "Title 2",
      content: "tests2",

      mood_id: 2,
      user_id: 1
    },
    {
      id: 3,
      title: "Title 3",
      content: "tests3",

      mood_id: 3,
      user_id: 1
    },
  ]
}
function makeFixtures() {
  const testUsers = makeUsersArray();
  const testMeds = makeMeditationsArray();
  const testNotes = makeNotesArray();
  return { testUsers, testMeds, testNotes };
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      users,
      notes,
      meditations`
  );
}
function seedUsersTable(db, users) {
  const preppedUsers = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1),
  }));
  return db
    .into('users')
    .insert(preppedUsers)
    .then(() =>
      db.raw(`SELECT setval('users_id_seq', ?)`, [
        users[users.length - 1].id,
      ])
    );
}

function seedMeditationsTable(db, testMeds) {
  const preppedTestMeds = testMeds.map((med) => ({
    ...med,
  }));
  // console.log(db)
  return db
    .into('meditations')
    .insert(preppedTestMeds)
    .then(() =>
      db.raw(`SELECT setval('meditations_id_seq', ?)`, [
        testMeds[testMeds.length - 1].id,
      ])
    );
}
function seedNotesTable(db, testNotes) {
  const preppedTestNotes = testNotes.map((note) => ({
    ...note,
  }));
  // console.log(db)
  return db
    .into('notes')
    .insert(preppedTestNotes)
    .then(() =>
      db.raw(`SELECT setval('notes_id_seq', ?)`, [
        testNotes[testNotes.length - 1].id,
      ])
    );
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  });
  return `bearer ${token}`;
}

module.exports = {
  makeUsersArray,

  makeAuthHeader,
  makeFixtures,

  cleanTables,
  seedUsersTable,
  seedMeditationsTable,
  seedNotesTable,
};
