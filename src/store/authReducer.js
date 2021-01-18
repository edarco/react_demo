import * as actionTypes from './authActionTypes';
import {checkLoginStatus} from '../helpers/auth';

const defaultState = {
    userId: null,
    registerSuccess: false,
    isAuthenticated: checkLoginStatus()
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
                registerSuccess: true,
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
                ...state,
                loading: false,
                isAuthenticated: false
            };
        }
        default: return state;
    }
};