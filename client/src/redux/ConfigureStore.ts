import { createStore, combineReducers, applyMiddleware } from "redux";
import { isProd } from "../config";

import thunk from "redux-thunk";
import logger from "redux-logger";

import { todo } from "./reducers/todo";

export const ConfigureStore: any = () => {
    let middleware: any[] = [];

    if (isProd()) {
        middleware = [...middleware, thunk];
    } else {
        middleware = [...middleware, thunk, logger];
    }

    const composeEnhancers =
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || null;

    const store = createStore(
        combineReducers({ todo }),
        composeEnhancers(applyMiddleware(...middleware))
    );

    return store;
};

export default ConfigureStore;
