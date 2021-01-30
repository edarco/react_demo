import * as actionTypes from './authActionTypes';
import { LOADING } from './taskActionTypes';
import { checkLoginStatus } from '../helpers/auth';

const defaultState = {
    isAuthenticated: checkLoginStatus(),
    loading: false,
    successMessage: null,
    error: null,
    userInfo: null,
    updateUsernameSuccess: false,
    changePasswordSuccess: false
};


export const authReducer = (state = defaultState, action) => {

    const loadingState = {
        ...state,
        loading: true,
        successMessage: null,
        error: null
    };


    switch (action.type) {
        case actionTypes.AUTH_LOADING: return loadingState;

        case LOADING: {
            return {
                ...state,
                successMessage: null,
                error: null
            };
        }

        case actionTypes.AUTH_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }


        case actionTypes.REGISTER_SUCCESS: {
            return {
                ...state,
                loading: false,
                successMessage: 'You have successfully registered!!!'
            };
        }


        case actionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                loading: false,
                isAuthenticated: true
            };
        }


        case actionTypes.LOGOUT_SUCCESS: {
            return {
                ...defaultState,
                isAuthenticated: false
            };
        }


        case actionTypes.GET_USER_INFO_SUCCESS: {
            return {
                ...state,
                loading: false,
                userInfo: action.userInfo
            };
        }



        case actionTypes.UPDATING_USER_INFO: {
            return {
                ...loadingState,
                updateUsernameSuccess: false
            };
        }

        case actionTypes.UPDATE_USER_INFO_SUCCESS: {
            return {
                ...state,
                loading: false,
                userInfo: action.userInfo,
                updateUsernameSuccess: true,
                successMessage: 'User info successfully updated!!!'
            };
        }



        case actionTypes.CHANGING_PASSWORD: {
            return {
                ...loadingState,
                changePasswordSuccess: false
            };
        }

        case actionTypes.CHANGE_PASSWORD_SUCCESS: {
            return {
                ...state,
                loading: false,
                changePasswordSuccess: true,
                successMessage: 'Password successfully changed!!!'
            };
        }

        default: return state;
    }
};