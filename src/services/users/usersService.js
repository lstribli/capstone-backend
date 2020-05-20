const xss = require('xss');
const Treeize = require('treeize');

const usersService = {
  addUser(db, newUser) {
    return db('users')
      .insert(newUser)
      .returning('*')
      .then(rows => rows[0]);
  }
};

module.exports = usersService;