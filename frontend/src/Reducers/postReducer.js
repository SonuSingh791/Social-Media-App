const postReducer = (
    state = { posts: [], loading: false, error: false, uploading: false },
    action
  ) => {
    switch (action.type) {
      // belongs to PostShare.jsx
      case "UPLOAD_START":
        return { ...state, error: false, uploading: true };
      case "UPLOAD_SUCCESS":
          console.log('uplaod success')
        return { ...state, posts: [action.data, ...state.posts], uploading: false, error: false };
      case "UPLOAD_FAIL":
          console.log('upload fail')
        return { ...state, uploading: false, error: true };
      // belongs to Posts.jsx
      case "RETREIVING_START":
          // console.log('retring start')
        return { ...state, loading: true, error: false };
      case "RETREIVING_SUCCESS":
          // console.log('retring sucess')
        return { ...state, posts: action.data, loading: false, error: false };
      case "RETREIVING_FAIL":
          // console.log('retring fail')
        return { ...state, loading: false, error: true };
      default:
        return state;
    }
  };
  
  export default postReducer;