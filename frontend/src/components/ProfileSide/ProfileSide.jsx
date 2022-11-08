import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard';
import LogoSeach from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard/ProfileCard'
import './ProfileSide.css';
const Profile = () => {
  return (
    <div className = "profileSide">
        <LogoSeach />
        <ProfileCard location = 'homepage' />
        <FollowersCard />
    </div>
  )
}

export default Profile