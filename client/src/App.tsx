import React, { PureComponent } from "react";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/ConfigureStore";
import "./App.scss";
import Todo from "./component/Todo";

const store: any = ConfigureStore();

export default class App extends PureComponent {
    render() {
        return (
            <Provider store={store}>
                <Todo />
            </Provider>
        );
    }
}
