import userModel from "../Model/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// register new user
export const registerUser = async(req, res) => {
    const {username, password, firstName, lastName} = req.body;
    const newUser = new userModel({username, password, firstName, lastName});
    try {
      const oldUser = await userModel.findOne({username: username});
      if(oldUser) {
        return res.status(400).json({message: "User already registered!"});
      }
        const user = await newUser.save();
        const token = jwt.sign({
          username: user.username, id: username._id
        }, process.env.JWT_KEY, {expiresIn: '1h'})
        res.status(200).json({message: "User registration successfully", user: newUser, token: token});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// loginUser
export const loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await userModel.findOne({ username: username });
  
      if (user) {
        const validity = await bcrypt.compare(password, user.password);
  
        if (!validity) {
          res.status(400).json("wrong password");
        } else {
          const token = jwt.sign(
            { username: user.username, id: user._id },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );
          const {password, ...otherDetails} = user._doc
          res.status(200).json({message: "user loggedIn successfully", user: otherDetails, token: token});
        }
      } else {
        res.status(404).json("User not found");
      }
    } catch (err) {
      res.status(500).json(err);
    }
}