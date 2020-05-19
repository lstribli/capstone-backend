const bcrypt = require('bcryptjs');



const encrypted = bcrypt.hashSync('password', 10);

console.log(encrypted);