const bcrypt = require("bcryptjs")
const ObjectId = require("mongodb").ObjectId;

const users = [
      {
    name: 'Mudassir',
    phoneNumber: '0342 3007757',
    password: bcrypt.hashSync('1111', 10),
    isAdmin: true,
  },
  {
    name: 'Iman',
    phoneNumber: '0304 4298634',
    password: bcrypt.hashSync('1111', 10),
  },
]

module.exports = users