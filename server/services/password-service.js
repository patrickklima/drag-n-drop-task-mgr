var bcrypt = require('bcrypt-nodejs');

const passwordService = {
  hashPassword: (password) => bcrypt.hashSync(password),
  comparePasswords: (submittedPw, storedPw) => bcrypt.compareSync(submittedPw, storedPw)
};

module.exports = passwordService;