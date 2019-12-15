import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Item.scss";

export default function Item({
    _id,
    value,
    done,
    last
}: {
    _id: number;
    value: string;
    done: boolean;
    last?: boolean;
}) {
    return (
        <Row className={last ? "todo__item todo__item__last" : "todo__item"}>
            <Col xs="1">
                {done ? (
                    <i className="fas fa-check-square todo__item__icon__done"></i>
                ) : (
                    <i className="fas fa-check-square todo__item__icon"></i>
                )}
            </Col>
            <Col
                xs="10"
                className="todo__item_content"
                contentEditable={done ? false : true}
            >
                {done ? (
                    <del>
                        ID: {_id.toString()} Value: {value} Done:{" "}
                        {done.toString()}
                    </del>
                ) : (
                    <>
                        ID: {_id.toString()} Value: {value} Done:{" "}
                        {done.toString()}
                    </>
                )}
            </Col>
            <Col xs="1">
                <div className="todo__item__trash">
                    <i className="fas fa-trash"></i>
                </div>
            </Col>
        </Row>
    );
}
