import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unFollowUser } from '../Actions/userAction';

const User = ({person}) => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.authReducer.authData); 
    const serverPublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const [followings, setFollowings] = useState(person.followers.includes(user._id));
    // console.log(person.followers.includes(user._id), " Person Follower")
    const handleFollow = () => {
        followings ? dispatch(unFollowUser(person._id, user))  : dispatch(followUser(person._id, user));
        setFollowings((prev) => !prev);
    }
    return (
        <div className="follower" >
            <div>
                <img src={person.profilePicture ? serverPublicFolder + person.profilePicture : serverPublicFolder + "defaultProfile.png"} alt="" className='followerImage' />
                <div className="name">
                    <span>{person.firstName}</span>
                    <span>{person.username}</span>
                </div>
            </div>
            <button className={ followings ? "button fc-button UnfollowButton" : "button fc-button" } onClick={handleFollow} >
                {followings ? "Unfollow" : "Follow"}
            </button>
        </div>
    )
}

export default User