import React, { useState } from 'react'
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import { useSelector } from 'react-redux'
import { likePost } from '../../Api/postRequest'


const Post = ({data}) => {
  // console.log(data.likes)
  const {user} = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [totalLikes, setTotalLikes] = useState(data.likes.length);
  const handleLikes = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);
    liked? setTotalLikes((prev) => prev - 1) : setTotalLikes((prev) => prev + 1);
  }
  // console.log(data.newPost)
  return (
    <div className="Post">
        <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image: ''} alt="" />


        <div className="postReact">
            <img src={liked?Heart: NotLike} style = {{cursor: "pointer"}} alt=""  onClick = {handleLikes} />
            <img src={Comment} alt="" />
            <img src={Share} alt="" />
        </div>


        <span style={{color: "var(--gray)", fontSize: '12px'}}>{totalLikes} likes</span>

        <div className="detail">
            <span><b>{data.name}</b></span>
            <span> {data.desc}</span>
        </div>
    </div>
  )
}

export default Post