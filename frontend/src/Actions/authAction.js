import * as AuthApi from '../Api/authRequest';

export const logIn = (formData) => async (dispatch) => {
    dispatch({type: "AUTH_START"});   // telling reducer, authentication has been started
    try {
        const {data} = await AuthApi.logIn(formData);   // it will pass formData in '../Api/authRequest' logIn()
        console.log(data)
        dispatch({type: "AUTH_SUCCESS", data: data}); // telling reducer, authentication has been succeded
    } catch (error) {
        console.log(error);
        dispatch({type: "AUTH_FAIL"}); // telling reducer, authentication has been failed
    }
}

export const signUp = (formData) => async (dispatch) => {
    dispatch({type: "AUTH_START"});   // telling reducer, authentication has been started
    try {
        const {data} = await AuthApi.signUp(formData);   // it will pass formData in '../Api/authRequest' signUp()
        dispatch({type: "AUTH_SUCCESS", data: data}); // telling reducer, authentication has been succeded
    } catch (error) {
        console.log(error);
        dispatch({type: "AUTH_FAIL"}); // telling reducer, authentication has been failed
    }
}

export const logOut = () => async (dispatch) => {
    dispatch({type: 'LOG_OUT'});  
}