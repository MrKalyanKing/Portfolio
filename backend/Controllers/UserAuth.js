import { UserModel } from "../models/Usermodel.js";
import validator from "validator";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import describeError from '../utils/httpError.js'




//login
const login= async (req,res)=>{
  try {
    const {email,password}=req.body
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are both required.' })
    }
    const user = await UserModel.findOne({email})

    if(!user){
      return  res.json({success:false,message:`No admin account exists for "${email}".`})
    }

    const isMatch= await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.json({success:false,message:"Incorrect password for this account."})
    }
    const token = CreateToken(user._id);
    if (!token) {
        return res.status(500).json({ success: false, message: 'Token generation failed.' });
    }

    res.json({ success: true, token });
  } catch (err) {
    console.error("login failed:", err);
    const { status, message } = describeError(err, "log in");
    res.status(status).json({ success: false, message });
  }
}


const CreateToken=(id)=>{
 return jwt.sign({id},process.env.JWT,{expiresIn:'1h'})
}

const register = async (req, res) => {
    const { name, email, password } = req.body;

    // Validate if the email format is correct
    if (!validator.isEmail(email)) {
        return res.json({ success: false, message: 'Enter a valid Email' });
    }

    // Check if the email already exists in the database
    const exists = await UserModel.findOne({ email });
    if (exists) {
        return res.json({ success: false, message: 'Email already exists' });
    }

    // Hash the password after checking email doesn't exist
    const salt = await bcrypt.genSalt(5);
    const hashedpass = await bcrypt.hash(password, salt);

    // Create a new user object
    const newUser = new UserModel({
        name: name,
        email: email,
        password: hashedpass,
    });

    // Save the user to the database
    try {
        const user = await newUser.save();
        return res.json({ success: true, message: 'User registered successfully', user });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.json({ success: false, message: 'Failed to register user', error: error.message });
    }
}


export{ login,register}