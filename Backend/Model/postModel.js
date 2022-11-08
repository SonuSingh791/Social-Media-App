import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    desc: String,
    likes: [],
    comments: [],
    image: String
}, {timestamps: true});

const postModel = mongoose.model('postModel', postSchema);
export default postModel; 