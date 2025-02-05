import bcrypt from "bcrypt";

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

