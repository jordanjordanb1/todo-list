import React, { useState } from "react";
import "./NewItem.scss";

export default function NewItem({ addItem }: { addItem: any }) {
    const [newItem, setNewItem] = useState("");

    return (
        <form
            onSubmit={e => {
                addItem(e, newItem);
                setNewItem("");
            }}
        >
            <input
                type="text"
                value={newItem}
                onChange={e => setNewItem(e.target.value)}
                placeholder="Add a new item..."
                className="todo_list__input"
            />
        </form>
    );
}
