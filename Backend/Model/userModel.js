import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    profilePicture: String,
    coverPicture: String,
    about: String,
    liveIn: String,
    relationship: String,
    worksAt: String,
    country: String,
    followers: [],
    followings: []
},
{timestamps: true}
);

userSchema.pre('save', async function(){
    let salt = await bcrypt.genSalt();
    let hashedStr = await bcrypt.hash(this.password, salt);
    this.password = hashedStr;
})

const userModel = mongoose.model('userModel', userSchema);
export default userModel; 