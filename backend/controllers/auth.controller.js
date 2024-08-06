import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
export const signup = async (req, res) => {
  const {
    email,
    name,
    password,
  } = req.body;
  try {
    // check if all fields are provided
    if (!email || !name || !password) {
      throw new Error("All fields are required");
    }
    
    // check if user already exists if yes throw error
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send({ error: "User already exists" });
    }
    
    // hash password
    const hashedPassword = await bcryptjs.hash(password, 10);
    
    // generate verification token for 6 digits
    const verificationToken = Math.floor(100000 + Math.random() * 900000);

    // create user
    const user = new User({
      email,
      name,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    // saving user to db
    await user.save();

    // generate token and set cookie
    generateTokenAndSetCookie(res, user._id);

    // send res to user
    res.status(201).send({ message: "User created successfully", user: {
      ...user._doc,
      password: undefined,
    } });
  } catch (error) {
    console.log('error in signup', error);
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  res.send("login");
};

export const logout = async (req, res) => {
  res.send("logout");
};
