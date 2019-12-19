import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Todo.scss";
import Item from "./Item/Item";
import NewItem from "./NewItem/NewItem";
import {
    refreshTodoItems,
    addTodoItem,
    deleteTodoItem,
    editTodoItem,
    markItemDone
} from "../redux/ActionCreators";
import { item } from "../interfaces/item.interface";

// Required for TypeScript
interface Props {
    todo_items: any;
    refreshToDoItems: any;
    addTodoItem: any;
    deleteTodoItem: any;
    editTodoItem: any;
    markItemDone: any;
}

class Main extends PureComponent<Props> {
    componentDidMount() {
        this.props.refreshToDoItems(); // Loads all the items from LocalStorage
    }

    // Deletes item after confirming
    deleteItem = (_id: number): boolean => {
        if (window.confirm("Are you sure want to delete this item?")) {
            this.props.deleteTodoItem(_id); // Sends to dispatch with _id
            return true;
        }

        return false;
    };

    // Marks item as done on checkmark click
    checkItem = (_id: number): boolean => {
        this.props.markItemDone(_id);
        return true;
    };

    // Adds a new item with value typed in input
    addItem = (e: any, value: string): boolean => {
        e.preventDefault(); // Prevents submitting of form

        this.props.addTodoItem(value);
        return true;
    };

    // Edits item value with new value
    editItem = (e: any, _id: number): boolean => {
        const content: string = e.target.value;

        this.props.editTodoItem(_id, content);
        return true;
    };

    // Renders all items that came from LocalStorage => Redux store
    renderItems = () => {
        const { todo_items }: any = this.props;

        // Checks to see if there are any items in the array
        if (todo_items.length !== 0) {
            return todo_items.map(
                ({ _id, value, done }: item, index: number) => {
                    if (todo_items.length !== index + 1) {
                        // Checks to see if last item in array
                        return (
                            <Item
                                deleteItem={this.deleteItem}
                                checkItem={this.checkItem}
                                editItem={this.editItem}
                                key={_id}
                                _id={_id}
                                value={value}
                                done={done}
                            />
                        );
                    } else {
                        // If last item, send a prop so that this item won't have a border-bottom css applied
                        return (
                            <Item
                                deleteItem={this.deleteItem}
                                checkItem={this.checkItem}
                                editItem={this.editItem}
                                key={_id}
                                _id={_id}
                                value={value}
                                done={done}
                                last={true}
                            />
                        );
                    }
                }
            );
        } else {
            // No items in array
            return (
                <Row>
                    <Col xs="12" className="text-center m-2">
                        <h2>
                            <i className="fas fa-frown"></i>
                            &nbsp;No items in list
                        </h2>
                    </Col>
                </Row>
            );
        }
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col
                        className="mt-md-5 mt-sm-2 p-3 todo"
                        xs={{ span: 12 }}
                        md={{ span: 6, offset: 3 }}
                    >
                        <Row className="text-center">
                            <Col>
                                <h1 className="mt-2">To-Do</h1>
                            </Col>
                        </Row>

                        <hr />

                        {this.renderItems()}

                        <hr />

                        <Row>
                            <Col xs={{ span: 11, offset: 1 }}>
                                <NewItem addItem={this.addItem} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state: any) => ({
        todo_items: state.todo.todo_items
    }),
    mapDispatchToProps = (dispatch: any) => ({
        refreshToDoItems: () => dispatch(refreshTodoItems()), // Runs instantly
        addTodoItem: (items: any) => dispatch(addTodoItem(items)),
        deleteTodoItem: (_id: number) => dispatch(deleteTodoItem(_id)),
        editTodoItem: (_id: number, content: string) =>
            dispatch(editTodoItem(_id, content)),
        markItemDone: (_id: number) => dispatch(markItemDone(_id))
    });

export default connect(mapStateToProps, mapDispatchToProps)(Main);
