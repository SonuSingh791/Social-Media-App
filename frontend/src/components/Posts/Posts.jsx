import React, {useEffect} from 'react';
import './Posts.css';
// import { PostsData } from '../../Data/PostsData';
import Post from '../Post/Post';
import {useDispatch, useSelector} from 'react-redux';
import { getTimeLinePosts } from '../../Actions/postAction';
import { useParams } from 'react-router-dom';
const Posts = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.authReducer.authData);
  let {posts, loading} = useSelector((state) => state.postReducer);
  const params = useParams();
  useEffect(() => {
    dispatch(getTimeLinePosts(user._id));
  }, [])
  // console.log(posts)
  if(!posts) return "No Post";
  // if we are in profile page then only user post should apear not timeline post
  if(params.id) posts = posts.filter((post) => post.userID === params.id);
  return (
    <div className="Posts">
       {
         loading ? <h1 style = {{textAlign: "center"}}>Fetching...</h1> : posts.map((post, id) => (
          <Post data = {post} key = {`termcbc${id}`} />
        ))
       }
    </div>
  )
}

export default Posts