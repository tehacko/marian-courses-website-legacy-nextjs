import bcrypt from "bcrypt";

export async function hashUserPassword(originalPassword) {
  const saltRounds = 10;
  return new Promise((resolve, reject) => {
      bcrypt.hash(originalPassword, saltRounds, (err, hashedPassword) => {
          if (err) {
              console.error("Error hashing password:", err);
              reject(err);
          } else {
              resolve(hashedPassword);
          }
      });
  });
}

export async function verifyPassword(reportedPassword, reportedUsername) {
          try {
          const checkUsername = await db.query("SELECT * FROM users WHERE username = $1", [
            reportedUsername,
          ]);
          if (checkUsername.rows.length > 0) {
            const user = checkUsername.rows[0];
            const storedHashedPassword = user.password;
            const reportedHashedPassword = hashUserPassword(reportedPassword);
            bcrypt.compare(reportedHashedPassword, storedHashedPassword, (err, valid) => {
              if (err) {
                console.error("Error comparing passwords:", err);
                return cb(err);
              } else {
                if (valid) {
                  return cb(null, user);
                } else {
                  return cb(null, false);
                }
              }
            })
          // Database data insertion
          } else {
            return cb("User not found.");
          }
        } catch (err) {
          return cb(err);
        }  
}