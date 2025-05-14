const bcrypt = require("bcryptjs");

const password = "admin123"; // Change to your desired password
const userpassword = "user123"; // Change to your desired password
const saltRounds = 12;

bcrypt.hash(userpassword, saltRounds, function (err, hash) {
  if (err) throw err;
  console.log("Hashed password:", hash);
});
