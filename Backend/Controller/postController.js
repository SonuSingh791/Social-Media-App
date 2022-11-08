import mongoose from "mongoose";
import postModel from "../Model/postModel.js";
import userModel from "../Model/userModel.js";

export const createPost = async (req, res) => {
    const newPost = new postModel(req.body);
    try {
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).json({Error: error});
    }
}

export const getPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await postModel.findById(id);
        res.status(200).json({message: "Post gets successfully", Posts: post});
    } catch (error) {
        res.status(500).json({Error: error});
    }
}

export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const {userID} = req.body;
    try {
        const post = await postModel.findById(postId);
        // check other user cannot update the post
        // console.log(post.userID)
        // console.log(userID)
        if(post.userID === userID) {  
            await post.updateOne({$set: req.body});
            res.status(200).json({message: "Post updated successfully", updatedPost: {post}});
        }
        else {
            res.status(403).json({message: "You can not update the post"});
        }
    } catch (error) {
        res.status(500).json({Error: error});
    }
}

// Delete a Post

export const deletePost = async (req, res) => {
    const postId = req.params.id;
    const {userID} = req.body;

    try {
        const post = await postModel.findById(postId);
        if(post.userID == userID) {
            res.status(200).json({message: "Post deleted successfully"});
        }
        else {
            res.status(403).json({message: "You can not update the post"});
        }
    } catch (error) {
        res.status(500).json({Error: error});
    }
}

// like/dislike post

export const likePost = async (req, res) => {
    const postId= req.params.id;
    const {userID} = req.body;

    try {
        const post = await postModel.findById(postId);
        if(!post.likes.includes(userID)) {
            await post.updateOne({$push: {likes: userID}});
            res.status(200).json({message: "post liked"});
        }
        else {
            await post.updateOne({$pull: {likes: userID}});
            res.status(200).json({message: "post disliked"});
        }
    } catch (error) {
        res.status(500).json({Error: error});
    }
}

// comment post
export const commentPost = async (req, res) => {
    const postId= req.params.id;
    const {userID, comment} = req.body;
    try {
        const post = await postModel.findById(postId);
        await post.updateOne({$push: {comments: {userID, comment}}});
        res.status(200).json({message: "post commented successfully"});
    } catch (error) {
        res.status(500).json({Error: error});
    }
}
// TimeLine Post

export const getTimeLinePosts = async (req, res) => {
    const userID = req.params.id;
    try {
        const currUserPosts = await postModel.find({userID: userID});
        // aggregate fun used to query b/w other models, I'm querying in userModel and want to get result from postModel
        const followingUserPost = await userModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userID)    // post id = _id: ObjectId('63594bc272dd448d4b49aeb7
                }
            },
            {
                $lookup: {
                    from: "postmodels",       // name of the model in db we want to intract
                    localField: "followings",    //  in userModel we have following array
                    foreignField: "userID",     // in this array we have userID and against those userId we want search post in postmodel
                    as: "followingUserPost"     // we want result in followingUserPost
                }
            }, 
            {
                $project: {     // how many filed u want to return 
                    followingUserPost: 1,   // just return 1 field as followingUserPost
                    _id: 0                  // default field _id returned so make it _id = 0 
                }
            }
        ]);
        // res.status(200).json({TimeLinePosts: currUserPosts.concat(followingUserPost)})
        res.status(200).json({TimeLinePosts: currUserPosts.concat(...followingUserPost[0].followingUserPost).sort((a, b) => {
            return b.createdAt - a.createdAt; // it will give recent post first
        })})
    } catch (error) {
        res.status(500).json({Error: error});
    }
}