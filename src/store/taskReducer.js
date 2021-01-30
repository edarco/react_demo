import * as actionTypes from './taskActionTypes';
import { LOGOUT_SUCCESS, AUTH_LOADING } from './authActionTypes';

const defaultState = {
    tasks: [],
    task: null,
    loading: false,
    error: null,
    addTaskSuccess: false,
    removeTaskSuccess: false,
    removeTasksSuccess: false,
    editTaskSuccess: false,
    successMessage: null,
    sendMessageSuccess: false
};


export const taskReducer = (state = defaultState, action) => {

    const loadingState = {
        ...state,
        loading: true,
        successMessage: null,
        error: null,
        addTaskSuccess: false,
        editTaskSuccess: false,
        removeTaskSuccess: false,
        removeTasksSuccess: false,
        sendMessageSuccess: false
    };


    switch (action.type) {

        case LOGOUT_SUCCESS: return defaultState;

        case AUTH_LOADING: {
            return {
                ...state,
                successMessage: null,
                error: null
            };
        }

        case actionTypes.LOADING: return loadingState;

        case actionTypes.ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }


        case actionTypes.GET_TASK_SUCCESS: {
            return {
                ...state,
                loading: false,
                task: action.task
            };
        }


        case actionTypes.GET_TASKS_SUCCESS: {
            return {
                ...state,
                loading: false,
                tasks: action.tasks
            };
        }


        case actionTypes.ADD_TASK_SUCCESS: {
            return {
                ...state,
                loading: false,
                tasks: [...state.tasks, action.task],
                addTaskSuccess: true,
                successMessage: 'Task created successfully!'
            };
        }


        case actionTypes.REMOVE_TASK_SUCCESS: {

            const newState = {
                ...state,
                loading: false,
                successMessage: 'Task removed successfully!'
            };

            if (action.from === 'single') {
                return {
                    ...newState,
                    task: null,
                    removeTaskSuccess: true
                };
            }
            else {
                const newTasks = state.tasks.filter(task => task._id !== action.taskId);

                return {
                    ...newState,
                    tasks: newTasks
                };
            }

        }


        case actionTypes.REMOVE_TASKS_SUCCESS: {

            let newTasks = [...state.tasks];

            action.taskIds.forEach(taskId => {
                newTasks = newTasks.filter(task => task._id !== taskId);
            });

            return {
                ...state,
                loading: false,
                tasks: newTasks,
                removeTasksSuccess: true,
                successMessage: 'Tasks removed successfully!'
            };
        }


        case actionTypes.EDIT_TASK_SUCCESS: {

            const newState = {
                ...state,
                loading: false,
                editTaskSuccess: true,
                successMessage: 'Task edited successfully!'
            };

            if (action.from === 'single') {
                return {
                    ...newState,
                    task: action.editedTask
                };
            }
            else {
                const tasks = [...state.tasks];
                const foundIndex = tasks.findIndex(task => task._id === action.editedTask._id);
                tasks[foundIndex] = action.editedTask;

                return {
                    ...newState,
                    tasks: tasks
                };
            }

        }


        case actionTypes.CHANGE_TASK_STATUS_SUCCESS: {
            let message;

            if (action.status === 'done') {
                message = 'Congratulations, you have completed the task 🎉!!!';
            }
            else {
                message = 'The task is active now!!!';
            }

            const newState = {
                ...state,
                loading: false,
                successMessage: message
            };

            if (action.from === 'single') {
                return {
                    ...newState,
                    task: action.editedTask
                };
            }
            else {
                const tasks = [...state.tasks];
                const foundIndex = tasks.findIndex(task => task._id === action.editedTask._id);
                tasks[foundIndex] = action.editedTask;

                return {
                    ...newState,
                    tasks: tasks
                };
            }

        }


        case actionTypes.SEND_MESSAGE_SUCCESS: {
            return {
                ...state,
                loading: false,
                sendMessageSuccess: true,
                successMessage: 'Message successfully sent!!!'
            };
        }

        default: return state;
    }
};