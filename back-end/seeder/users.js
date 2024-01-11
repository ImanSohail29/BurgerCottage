const bcrypt = require("bcryptjs")
const ObjectId = require("mongodb").ObjectId;

const users = [
      {
    name: 'Mudassir',
    phoneNumber: '03423007757',
    password: bcrypt.hashSync('1111', 10),
    isAdmin: true,
  },
  {
    name: 'Iman',
    phoneNumber: '03044298634',
    password: bcrypt.hashSync('1111', 10),
  },
]

module.exports = users