import * as ActionTypes from "../ActionTypes";

export const todo = (
    state: any = {
        todo_items: []
    },
    action: any
) => {
    switch (action.type) {
        case ActionTypes.LOAD_TODO_ITEMS:
            return { ...state, todo_items: action.payload };
        default:
            return state;
    }
};
