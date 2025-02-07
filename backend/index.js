import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import env from "dotenv";
import express from "express";
import GoogleStrategy from "passport-google-oauth2";
import passport from "passport";
import pg from "pg";
import session from "express-session";
import { Strategy } from "passport-local";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json()); // Add this line to parse JSON request bodies
const port = 5000;
const saltRounds = 10;
env.config();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 4,
      httpOnly: true,  // Ensure the cookie is only accessible by the server
      secure: false    // Set this to true if you're using https (for production)
    }
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());

const { Pool } = pg;
const db = new pg.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

app.use((req, res, next) => {
  res.locals.user = req.user || null; // Pass the user object or null if not authenticated
  res.locals.isAdmin = req.user?.isAdmin || false; // Add isAdmin for template use
  next();
});

app.get("/news", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate delay
  try {
    const result = await db.query('SELECT * FROM courses');
    
    // Format the date in the result to YYYY-MM-DD format
    const courses = result.rows.map(course => {
      // Ensure the 'date' is a string in the correct format
      if (course.date instanceof Date) {
        course.date = course.date.toISOString().split('T')[0]; // Convert to 'YYYY-MM-DD' string
      }
      return course;
    });

    return res.json(courses); // Return the formatted courses
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
});

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkResult = await db.query(
      "SELECT * FROM users WHERE email = $1", [email]
    );

    if (checkResult.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists. Try logging in." });
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ error: "Internal server error." });
      }

      try {
        const result = await db.query(
          'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
          [email, hash]
        ); 
        
        const user = result.rows[0];

        // Using req.login if you have session-based authentication
        req.login(user, (err) => {
          if (err) {
            console.error("Login error:", err);
            return res.status(500).json({ error: "Login failed, but registration successful." });
          }

          res.status(201).json({
            message: "You have been successfully registered!",
            user: { id: user.id, email: user.email } // Don't send password
          });
        });

      } catch (insertError) {
        console.error('Error inserting data:', insertError);
        return res.status(500).json({ error: "Database insertion error." });
      }
    });

  } catch (queryError) {
    console.error('Database query error:', queryError);
    return res.status(500).json({ error: "Internal server error." });
  }  
});

// app.get("/logout", (req, res) => {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("/");
//   });
// });

// app.get("/loggedinpage", (req, res) => {
//   if (req.isAuthenticated()) {
//     res.render("loggedinpage.ejs", {
//       reportedUsername: req.user.username, 
//       confirmRegistration: heading,         
//     });
//   } else {
//     res.redirect("/login");
//   }
// });

// // Make it work
// app.get("/adminloggedin", (req, res) => {
//   if (req.isAuthenticated()) {
//     res.render("adminloggedin.ejs", {
//       adminUsername: req.user.username, 
//       confirmRegistration: heading,        
//     });
//   } else {
//     res.redirect("/login");
//   }
// });

// app.get(
//   "/auth/google",
//   passport.authenticate("google", {
//   scope: ["profile", "email"],
//   })
// );

// app.get(
//   "/auth/google/loggedinpage",
//   passport.authenticate("google", {
//     successRedirect: "/loggedinpage",
//     failureRedirect: "/login",
//   })
// );

// app.get("/auth/status", (req, res) => {
//   if (req.isAuthenticated()) {
//     res.json({ authenticated: true,
//       username: req.user.username 
//       });
//   } else {
//     res.json({ authenticated: false });
//   }
// });

// app.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/loggedinpage",
//     failureRedirect: "/login",
//   })
// );

// app.post(
//   "/adminlogin",
//   passport.authenticate("adminlocal", {
//     successRedirect: "/adminloggedin",
//     failureRedirect: "/adminlogin",
//   })
// );



// // PUT method here (replace user data)
//   // 1. logic
//   // 2. alert box asking the user to rewrite data?

// // DELETE method here
// // 1. logic
// // 2. alert box asking "Are you sure?"¨

// passport.use(
//   "local",
//   new Strategy(async function verify(username, password, cb) {
//   try {
//     const checkUsername = await db.query("SELECT * FROM users WHERE username = $1", [
//       username,
//     ]);
//     if (checkUsername.rows.length > 0) {
//       const user = checkUsername.rows[0];
//       const storedHashedPassword = user.password;
//       bcrypt.compare(password, storedHashedPassword, (err, valid) => {
//         if (err) {
//           console.error("Error comparing passwords:", err);
//           return cb(err);
//         } else {
//           if (valid) {
//             return cb(null, user);
//           } else {
//             return cb(null, false);
//           }
//         }
//       })
//     // Database data insertion
//     } else {
//       return cb("User not found.");
//     }
//   } catch (err) {
//     return cb(err);
//   }  
//   })
// );

// passport.use(
//   "adminlocal",
//   new Strategy(async function verify(admin_username, admin_password, cb) {
//   try {
//     const checkAdminUsername = await db.query("SELECT * FROM admins WHERE admin_username = $1", [
//       admin_username,
//     ]);
//     if (checkAdminUsername.rows.length > 0) {
//       const user = checkAdminUsername.rows[0];
//       const storedHashedAdminPassword = user.admin_password;
//       bcrypt.compare(admin_password, storedHashedAdminPassword, (err, valid) => {
//         if (err) {
//           console.error("Error comparing passwords:", err);
//           return cb(err);
//         } else {
//           if (valid) {
//             return cb(null, {user, isAdmin: true});
//           } else {
//             return cb(null, false);
//           }
//         }
//       })
//     // Database data insertion
//     } else {
//       return cb("Admin not found.");
//     }
//   } catch (err) {
//     return cb(err);
//   }  
//   })
// );

// passport.use(
//   "google",
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:5000/auth/google/loggedinpage",
//       userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
//     }, 
//     async (accessToken, refreshToken, profile, cb) => {
//       try {
//         const result = await db.query("SELECT * FROM users WHERE email = $1", [
//           profile.email,
//         ]);
//         if (result.rows.length === 0) {
//           const newUser = await db.query(
//             "INSERT INTO users (username, password) VALUES ($1, $2)",
//             [profile.email, "google"]
//           );
//           return cb(null, newUser.rows[0]);
//         } else {
//           return cb(null, result.rows[0]);
//         }
//       } catch (err) {
//         return cb(err);
//       }
//     }
//   )
// );

// passport.serializeUser((user, cb) => {
//   cb(null, user);
// });

// passport.deserializeUser((user, cb) => {
//   cb(null, user);
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
