


// const User = require('../models/user.js');

// const { validationResult } = require('express-validator');
// const jwt = require('jsonwebtoken');
// const expressJwt = require('express-jwt');


// exports.signup = (req, res) => {
//   const errors = validationResult(req)


//   if (!errors.isEmpty()) {
//     return res.status(422).json({
//       error: errors.array()[0].msg
//     })
//   }
//   const user = new User(req.body)
//   user.save((err, user) => {
//     if (err) {
//       console.log(err);
//       return res.status(400).json({
//         err: "NOt FounD"
//       })

//     }
//     res.json(user);
//   })

// }

// exports.signin = (req, res) => {
//   const { email, password } = req.body;
//   const errors = validationResult(req)
//   if (!errors.isEmpty()) {
//     return res.status(422).json({
//       error: errors.array()[0].msg
//     });
//   }
//   User.findOne({ email }, (err, user) => {
//     if (err || !user) {
//       res.status(400).json({
//         error: "User email doesn't exist"
//       })
//     }
//     if (!user.authenticate(password)) {
//       res.status(401).json({
//         error: "email and pasword do not match "
//       })
//     }
//     const token = jwt.sign({ _id: user._id }, 'secret')
//     res.cookie("token", token, { expire: new Date() + 9999 });

//     const { _id, name, email, role } = user;

//     return res.json({ token, user: { _id, name, email, role } })
//   });
// };
// exports.signout = (req, res) => {
//   res.clearCookie("token")
//   res.send('user succesfully signed out')
// };


// exports.isSignedIn = expressJwt({
//   secret:'secret',
//   algorithms: ['HS256']
// })

// // exports.isSignedIn = expressJwt({
// //   secret:'secret',
// //   userProperty: "auth",
// //   algorithms: ['HS256']
// // })

// exports.isAuthenticated = (req, res, next) => {
//   let checker = req.profile && req.auth && req.profile._id == req.auth._id
//   if (!checker) {
//     res.status(403).json({
//       error: "ACCESS DENIED"
//     })
//   }
//   next();
// }

// exports.isAdmin = (req, res, next) => {
//   if (req.profile.role === 0) {
//     return res.status(403).json({
//       error: "You are not ADMIN, Access denied"
//     });
//   }
//   next();
// };

const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      console.log(err);

      return res.status(400).json({

        err: "NOT able to save user in DB"
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER email does not exists"
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match"
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, 'secret');
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully"
  });
};


exports.isSignedIn = expressJwt({
  secret:'secret',
  userProperty:"auth",
  algorithms:['HS256']
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker =  req.profile._id == req.auth._id;
  // let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({

      error: "ACCESS DENIED"
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not ADMIN, Access denied"
    });
  }
  next();
};
