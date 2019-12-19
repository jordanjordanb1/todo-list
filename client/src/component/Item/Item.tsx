import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Item.scss";

export default function Item({
    _id,
    value,
    done,
    last,
    deleteItem,
    checkItem,
    editItem
}: {
    _id: any;
    value: string;
    done: boolean;
    last?: boolean;
    deleteItem: any;
    checkItem: any;
    editItem: any;
}) {
    return (
        <Row className={last ? "todo__item todo__item__last" : "todo__item"}>
            <Col
                xs="1"
                className="d-flex align-items-center justify-content-center"
                onClick={() => checkItem(_id)}
            >
                {done ? (
                    <i className="fas fa-check-square todo__item__icon__done"></i>
                ) : (
                    <i className="fas fa-check-square todo__item__icon"></i>
                )}
            </Col>
            <Col xs="10" className="d-flex align-items-center">
                <input
                    type="text"
                    className="todo__item_content"
                    value={value}
                    onChange={(e: any) => editItem(e, _id)}
                />
            </Col>
            <Col
                xs="1"
                onClick={() => deleteItem(_id)}
                className="todo__item__trash"
            >
                <i className="fas fa-trash"></i>
            </Col>
        </Row>
    );
}
