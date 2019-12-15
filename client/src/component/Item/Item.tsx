import React from "react";
import "./Item.scss";

export default function Item({
    value,
    done
}: {
    value: string;
    done: boolean;
}) {
    return (
        <div className="todo__item">
            {value} Done: {done.toString()}
        </div>
    );
}
