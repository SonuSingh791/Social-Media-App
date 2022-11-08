const authReducer = (state = {authData : null, loading: false, error: false, updateLoading: false}, action) => {
    switch (action.type) {
        case 'AUTH_START':
            return {...state, loading: true, error: false};  
        case 'AUTH_SUCCESS':
            console.log(action);
            localStorage.setItem("profile", JSON.stringify({...action?.data})); // action?.data means if data is present then only save
            return {...state, authData: action.data, loading: false, error: false};  
        case 'AUTH_FAIL':
            return {...state, loading: false, error: true};
        case "UPDATING_START": 
            return {...state, updateLoading: true, error: false}
        case "UPDATING_SUCCESS": 
            localStorage.setItem("profile", JSON.stringify({...action?.data}));
            return {...state, authData: action.data, updateLoading: false, error: false};
        case "UPDATING_FAIL":
            return {...state, updateLoading: false, error: true}; 
        case 'LOG_OUT':
            localStorage.clear();
            return {...state, authData: null, loading: false, error: false};
        case "FOLLOW_USER":
            console.log("Follow User")
            return {...state, authData: {...state.authData, user: {...state.authData.user, followings: [...state.authData.user.followings, action.data]} }}
            
        case "UNFOLLOW_USER":
            console.log("Unfollow User")
            return {...state, authData: {...state.authData, user: {...state.authData.user, followings: [...state.authData.user.followings.filter((personId)=>personId!==action.data)]} }}
        
        default:
            return state;
    }
}

export default authReducer;