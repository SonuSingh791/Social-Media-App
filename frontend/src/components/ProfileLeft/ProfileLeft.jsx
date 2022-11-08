import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import InfoCard from '../InfoCard/InfoCard'
import LogoSeach from '../LogoSearch/LogoSearch'

const ProfileLeft = () => {
  return (
   <div className="ProfileSide">
       <LogoSeach />
       <InfoCard/>
       <FollowersCard/>
   </div>
  )
}

export default ProfileLeft