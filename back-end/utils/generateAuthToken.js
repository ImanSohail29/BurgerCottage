const jwt = require("jsonwebtoken");

const generateAuthToken = (_id, name, phoneNumber, isAdmin) => {
  return jwt.sign(
    { _id, name,phoneNumber, isAdmin },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7h" }
  );
};
module.exports = generateAuthToken