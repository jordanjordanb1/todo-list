import * as ActionTypes from "./ActionTypes";
import { item } from "../interfaces/item.interface";

// Loads items from LocalStorage and puts them in store
export const loadTodoItems = () => (dispatch: any): boolean => {
    const todo_items = localStorage.getItem("todo_items"); // Gets items from LocalStorage

    // Checks if any items are set
    if (todo_items) {
        const todo_itemsObj: item[] = JSON.parse(todo_items); // Returns JSON object to JS object

        // Dispactches items to store
        dispatch({
            type: ActionTypes.LOAD_TODO_ITEMS,
            payload: todo_itemsObj
        });
        return true;
    }

    console.warn("No items found in localStorage!");
    return false;
};

// Helper function to save items to LocalStorage
export const saveTodoItemsToStorage = (items: any) => (
    dispatch: any
): boolean => {
    // Double checks to see if items exist
    if (items) {
        const jsonItems = JSON.stringify(items); // Creates a JSON object from JS object

        try {
            // Tries to set JSON obj to LocalStorage
            localStorage.setItem("todo_items", jsonItems);
            return true;
        } catch (e) {
            // If error console log it and return false
            console.error(e);
            return false;
        }
    }

    return false;
};

// Adds a new item
export const addTodoItem = (value: string) => (
    dispatch: any,
    getState: any
): boolean => {
    if (value) {
        const todo_items: item[] = getState().todo.todo_items, // Gets items already set in store
            newItem = { _id: todo_items.length + 1, value, done: false },
            newItems = [...todo_items, newItem];

        dispatch({
            type: ActionTypes.ADD_TODO_ITEM,
            payload: newItems
        });
        dispatch(saveTodoItemsToStorage(newItems)); // Saves to LocalStorage
    }

    return false;
};

// Deletes item
export const deleteTodoItem = (_id: number) => (
    dispatch: any,
    getState: any
): boolean => {
    const todoItems: item[] = getState().todo.todo_items; // Gets items already set in store

    if (todoItems.length !== 0) {
        const copy_todoItems = todoItems.filter(item => item._id !== _id); // Finds matching item and removes it from array

        dispatch({
            type: ActionTypes.DELETE_TODO_ITEM,
            payload: copy_todoItems
        });
        dispatch(saveTodoItemsToStorage(copy_todoItems)); // Saves to LocalStorage
        return true;
    }

    return false;
};

// Edits value in item
export const editTodoItem = (_id: number, content: string) => (
    dispatch: any,
    getState: any
): boolean => {
    let todo_items: item[] = [...getState().todo.todo_items]; // Gets items already set in store

    if (todo_items.length !== 0) {
        todo_items.find((item: item) => item._id === _id)!.value = content; // Finds item and replaces value NOTE: '!' is required so TS doesn't say item will be null

        dispatch({
            type: ActionTypes.EDIT_TODO_ITEM,
            payload: todo_items
        });
        dispatch(saveTodoItemsToStorage(todo_items)); // Saves to LocalStorage

        return true;
    }

    return false;
};

// Marks item to done or not done
export const markItemDone = (_id: number) => (
    dispatch: any,
    getState: any
): boolean => {
    let todo_items: item[] = [...getState().todo.todo_items]; // Gets items already set in store

    if (todo_items) {
        // Loops through items and finds matching and changes the 'done' option to the opposite
        todo_items = todo_items.map(item => {
            if (item._id === _id) {
                item.done = !item.done;
            }

            return item;
        });

        dispatch({
            type: ActionTypes.MARK_ITEM_DONE,
            payload: todo_items
        });

        dispatch(saveTodoItemsToStorage(todo_items)); // Saves to LocalStorage

        return true;
    }

    return false;
};
