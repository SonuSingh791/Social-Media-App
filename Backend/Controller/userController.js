// index.js -----------------------> Routes ------------------------------------> Controller
// (starting point of app)         (authRouter, userRouter, postRouter)         (authController, userController, postController)
import jwt from "jsonwebtoken";
 import userModel from "../Model/userModel.js";
 import bcrypt from 'bcrypt';

// getAllUser

export const getAllUsers = async (req, res) => {
    try {
        let users = await userModel.find();   // it will 20 res from DB not all
        // console.log(users)
        users = users.map((user, id) => {
            const {password, ...otherDetails} = user._doc;
            // console.log(otherDetails)
            return otherDetails;
        });
        // console.log(users)
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
}

 // get User
 export const getUser = async (req, res) => {
     const id = req.params.id;
    //  console.log(id)
     try {
         const user = await userModel.findById(id);
         console.log(user)
         console.log("try")
        // const allUser = await userModel.find(); // to find all user
         if(user) {
             const {password, ...otherDetails} = user._doc; // password is extracted
             res.status(202).json(otherDetails);               // and it will not send the password
         }
         else {
             res.status(404).json({Message: "User dosen't exist"});
         }
     } catch (error) {
         res.status(500).json({Error: error});
     }
 }

 // update user

 export const updateUser = async (req, res) => {

     const id = req.params.id;
     const {_id, password} = req.body;
     if(id === _id ) {
         try {
             if(password) {
                 const salt = await bcrypt.genSalt(10);
                 const hashedPassword = await bcrypt.hash(password, salt);
                 req.body.password = hashedPassword;
             }
             console.log("password " + password);
             const user = await userModel.findByIdAndUpdate(id, req.body, {new: true}); // {new: true} means after updation it will give updated user
             const token = jwt.sign({username: user.username, id: user._id}, process.env.JWT_KEY, {expiresIn: "1h"});
             res.status(200).json({user, token});
         } catch (error) {
             res.status(500).json({Error: error});
         }
     }
     else {
         res.status(403).json({Message: "access denied, u can update only your own profile"});
     }
 }


 // Delete User
 export const deleteUser = async (req, res) => {
     const id = req.params.id;
     const {currentUserId, currentUserAdminStatus} = req.body;
     if(id === currentUserId || currentUserAdminStatus) {
         try {
             await userModel.findByIdAndDelete(id);
             res.status(200).json({Message: "User deleted Successfully"});
         } catch (error) {
            res.status(500).json({Error: error});
         }
     }
     else {
        res.status(403).json({Message: "access denied, u can delete only your own profile"});
     }
 }

 // Follow User

 export const followUser = async (req, res) => {
    const id = req.params.id;
    const { _id } = req.body;
    // console.log("id = " + id, "_id = " + _id)
    if (_id === id) {
        res.status(403).json("Action Forbidden");
    } else {
        try {
        const followUser = await userModel.findById(id);
        const followingUser = await userModel.findById(_id);

        if (!followUser.followers.includes(_id)) {
            await followUser.updateOne({ $push: { followers: _id } });
            await followingUser.updateOne({ $push: { followings: id } });
            res.status(200).json("User followed!");
        } else {
            res.status(403).json("you are already following this id");
        }
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    }
 }

 // Unfollow User

 export const unFollowUser = async (req, res) => {
    const id = req.params.id;
    const {_id} = req.body;
    if(_id === id) {
        res.status(404).json({message: "Action forbidden"});
    }
    else {
        try {
            const userToBeUnFollowed = await userModel.findById(id);
            const userWantsToUnFollow = await userModel.findById(_id);
            if(userToBeUnFollowed.followers.includes(_id)) {   // if currUser doesn't follow him then only he can follow him
                await userToBeUnFollowed.updateOne({$pull: {followers: _id}}); // pushed currUseID in his follower array in DB
                await userWantsToUnFollow.updateOne({$pull: {followings: id}}); // pushed id of user whome currUser wants to follow in his followings arr in DB
                res.status(200).json({message: "User unFollowed successfully"});
            }
        else {
            res.status(403).json({message: "You don't follow this user"});
        }
        } catch (error) {
            res.status(500).json({Error: error});
        }
    }
 }