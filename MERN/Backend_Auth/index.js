const bcrypt = require("bcryptjs");

const secuarePassword = async (password) => {
  const passwordHash = await bcrypt.hash(password, 10);
  console.log(passwordHash);

  const passwordMatch = await bcrypt.compare(password, passwordHash)
  console.log(passwordMatch)
};

secuarePassword('thapa@123')
