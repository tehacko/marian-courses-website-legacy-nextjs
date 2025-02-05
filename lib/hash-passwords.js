import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";

export async function hashUserPassword(originalPassword) {
    const saltRounds = 10;
    bcrypt.hash(originalPassword, saltRounds, async (err, hashedPassword) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          return hashedPassword;
        };
    });
}

export function verifyPassword(storedHashedPassword, reportedPassword) {
    // passport.use(
    //     "local",
    //     new Strategy(async function verify(username, password, cb) {
    //     try {
    //       const checkUsername = await db.query("SELECT * FROM users WHERE username = $1", [
    //         username,
    //       ]);
    //       if (checkUsername.rows.length > 0) {
    //         const user = checkUsername.rows[0];
    //         const storedHashedPassword = user.password;
    //         bcrypt.compare(password, storedHashedPassword, (err, valid) => {
    //           if (err) {
    //             console.error("Error comparing passwords:", err);
    //             return cb(err);
    //           } else {
    //             if (valid) {
    //               return cb(null, user);
    //             } else {
    //               return cb(null, false);
    //             }
    //           }
    //         })
    //       // Database data insertion
    //       } else {
    //         return cb("User not found.");
    //       }
    //     } catch (err) {
    //       return cb(err);
    //     }  
    //     })
    //   );
}