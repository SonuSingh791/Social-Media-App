import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './ProfileCard.css';
const ProfileCard = ({location}) => {
  const {posts} = useSelector((state) => state.postReducer)
  const {user} = useSelector((state) => state.authReducer.authData);
  const serverPublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  // console.log(user.followings)
    return (
      <div className = "ProfileCard">
          <div className="ProfileImages">
              <img src= {user.coverPicture ? serverPublicFolder + user.coverPicture : serverPublicFolder + 'coverDefault.jpg'} alt="" />
              <img src= {user.profilePicture ? serverPublicFolder + user.profilePicture : serverPublicFolder + "defaultProfile.png"}  alt="" />
          </div>
          <div className="ProfileName">
              <span>{user.firstName} {user.lastName}</span>
              <span>{user.worksAt ? user.worksAt : "Write about yourself."}</span>
          </div>
          <div className="followStatus">
          <hr />
          <div>
            <div className="follow">
              <span>{user.followings.length}</span>
              <span>Following</span>
            </div>
            <div className="vl"></div>
            <div className="follow">
              <span>{user.followers.length}</span>
              <span>Followers</span>
            </div>

            {location === 'profilePage' && (
              <>
                <div className="vl"></div>
                <div className="follow">
                  <span>{posts.filter((post) => post.userID === user._id).length}</span>
                  <span>Posts</span>
                </div>
              </>
            )}
          </div>
          <hr />
        </div>
        {location === 'profilePage' ? "" : <span > <Link to = {`/profile/${user._id}`} style = {{textDecoration: "none", color: 'inherit'}} >My Profile </Link></span>}
      </div>
    )
  }

  export default ProfileCard;