import * as ActionTypes from "./ActionTypes";
import { item } from "../interfaces/item.interface";
import db from "../shared/db";

// Refreshes items in the store from IndexedDB
export const refreshTodoItems = () => (dispatch: any): boolean => {
    db.table("todo_items")
        .toArray()
        .then((items: item[]) => {
            if (items) {
                // Dispatches items to store
                dispatch({
                    type: ActionTypes.LOAD_TODO_ITEMS,
                    payload: items
                });
                return true;
            }

            console.warn("No items found in IndexedDB!");
            return false;
        })
        .catch(e => console.error(e));

    return false;
};

// Adds a new item
export const addTodoItem = (value: string) => (dispatch: any): boolean => {
    if (value) {
        const newItem = { value, done: false };

        db.table("todo_items")
            .add(newItem)
            .then(_id => {
                dispatch(refreshTodoItems()); // Required to reput items in store
                return true;
            })
            .catch(e => console.error(e));

        return false;
    }

    return false;
};

// Deletes item
export const deleteTodoItem = (_id: number) => (dispatch: any): boolean => {
    if (_id) {
        db.table("todo_items")
            .delete(_id) // Deletes item by ID
            .then(res => {
                dispatch(refreshTodoItems()); // Required to reput items in store
                return true;
            })
            .catch(e => console.error(e));

        return false;
    }

    return false;
};

// Edits value in item
export const editTodoItem = (_id: number, content: string) => (
    dispatch: any
): boolean => {
    if (content) {
        db.table("todo_items")
            .update(_id, { value: content }) // Updates new item in DB
            .then(res => {
                dispatch(refreshTodoItems()); // Required to reput items in store
                return true;
            });

        return false;
    }

    return false;
};

// Marks item to done or not done
export const markItemDone = (_id: number) => (dispatch: any): boolean => {
    if (_id) {
        db.table("todo_items")
            .get(_id)
            .then(item => {
                db.table("todo_items")
                    .update(_id, { done: !item.done }) // Changes 'done' in DB
                    .then(res => {
                        dispatch(refreshTodoItems()); // Required to reput items in store
                        return true;
                    });

                return false;
            });

        return false;
    }

    return false;
};
