import React, { PureComponent } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Todo.scss";
import Item from "./Item/Item";

export default class Main extends PureComponent {
    state = {
        todo_items: [
            { value: "Go to bank", done: false },
            { value: "Get milk", done: false },
            { value: "Take a shower", done: false }
        ]
    };

    render() {
        return (
            <Container className="d-flex justify-content-center align-items-center">
                <div className="todo mt-md-5 mt-sm-2 p-3">
                    <Row className="text-center">
                        <Col>
                            <h1>To-Do</h1>
                        </Col>
                    </Row>

                    <hr />

                    {this.state.todo_items.map(item => {
                        return (
                            <Row key={item.value}>
                                <Col>
                                    <Item value={item.value} done={item.done} />
                                </Col>
                            </Row>
                        );
                    })}
                </div>
            </Container>
        );
    }
}
