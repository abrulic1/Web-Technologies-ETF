const plaintextPassword = 'nekipasword';

bcrypt.hash(plaintextPassword, 10, function(err, hash) {
    // hash šifre imate ovdje
    console.log(hash);
  });