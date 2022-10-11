import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export function signup(req, res, next) {
  const {name, email, add, pwd: password} = req.body;

  if (!name || !email || !password || !add) {
    res.status(400).json({error: "Please add all fields"});
    next();
  } else {
    User.findOne({email}).then((userExists) => {
      if (userExists) {
        res.status(400).json({error: "User already exists"});
        next();
      } else {
        bcrypt.genSalt(10).then(salt => {
          bcrypt.hash(password, salt).then(hashedPassword => {
            User.create({
              email: email,
              pwd: hashedPassword,
              name: name,
              add,
            }).then(user => {
              if (user) {
                res.status(201).json({
                  userId: user._id,
                  token: generateToken(user._id),
                  userEmail: email,
                  name: name,
                  cart: user.cart || [],
                  address: user.add,
                });
              } else {
                res.status(400).json({error: "Invalid user data"});
                next();
              }
            });
          });
        }).catch((err) => {
          next(err);
        });
      }
    });
  }
}

export function signin(req, res, next) {
  const {email, pwd: password} = req.body;

  if (!!email && !!password) {
    User.findOne({email})
      .then(async (user) => {
        if (user) {
          if (await bcrypt.compare(password, user.pwd)) {
            user = await user.populate("cart");
            res.json({
              userId: user._id,
              token: generateToken(user._id),
              userEmail: user.email,
              name: user.name,
              cart: user.cart,
              address: user.add,
            });
          } else {
            res.status(400).json({error: "Invalid password"});
            next();
          }
        } else {
          res.status(400).json({error: "User doesn't exist"});
          next();
        }
      })
      .catch((err) => {
        next(err);
      });
  } else {
    res.status(400).json({error: "Please include all the required fields"});
    next();
  }
}

export function verifyToken(req, res, next) {
  const {token} = req.body;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "secretKey");
    res.status(200).json({message: "Token verified."});
  } catch (error) {
    const err = new Error("Token expired. Please sign-in to continue");
    err.statusCode = 401;
    next(err);
  }
}

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};