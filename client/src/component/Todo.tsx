import React, { PureComponent } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Todo.scss";
import Item from "./Item/Item";

interface item {
    _id: number;
    value: string;
    done: boolean;
}

export default class Main extends PureComponent {
    state = {
        todo_items: [
            { _id: 1, value: "Go to bank", done: false },
            { _id: 2, value: "Get milk", done: true },
            { _id: 3, value: "Take a shower", done: false },
            { _id: 4, value: "Take dog out", done: false },
            { _id: 5, value: "Turn off oven", done: true }
        ]
    };

    render() {
        const { todo_items }: any = this.state;

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

                        {todo_items.map((item: item, index: number) => {
                            if (todo_items.length !== index + 1) {
                                return (
                                    <Item
                                        key={item._id}
                                        _id={item._id}
                                        value={item.value}
                                        done={item.done}
                                    />
                                );
                            } else {
                                return (
                                    <Item
                                        key={item._id}
                                        _id={item._id}
                                        value={item.value}
                                        done={item.done}
                                        last={true}
                                    />
                                );
                            }
                        })}
                    </Col>
                </Row>
            </Container>
        );
    }
}
