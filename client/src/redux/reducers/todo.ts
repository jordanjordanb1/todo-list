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
        case ActionTypes.ADD_TODO_ITEM:
            return { ...state, todo_items: action.payload };
        case ActionTypes.DELETE_TODO_ITEM:
            return { ...state, todo_items: action.payload };
        case ActionTypes.EDIT_TODO_ITEM:
            return { ...state, todo_items: action.payload };
        case ActionTypes.MARK_ITEM_DONE:
            return { ...state, todo_items: action.payload };
        default:
            return state;
    }
};
