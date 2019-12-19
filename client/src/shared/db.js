import Dexie from "dexie";

const db = new Dexie("todo_items");
db.version(1).stores({
    todo_items: "++_id, value, done"
});

export default db;
