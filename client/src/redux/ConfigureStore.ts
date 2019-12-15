import { createStore, combineReducers, applyMiddleware } from "redux";
import { isProd } from "../config";

import thunk from "redux-thunk";
import logger from "redux-logger";

import { default__reducer } from "./reducers/default";

export const ConfigureStore = () => {
    let middleware: any[] = [];

    if (isProd()) {
        middleware = [...middleware, thunk];
    } else {
        middleware = [...middleware, logger, thunk];
    }

    const store = createStore(
        combineReducers(default__reducer),
        applyMiddleware(...middleware)
    );

    return store;
};

export default ConfigureStore;
