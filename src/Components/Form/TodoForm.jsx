import { useState, memo } from "react";
import "./TodoForm.css";

const TodoForm = memo(
  ({ onAdd }) => {
    const [text, setText] = useState("");

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAdd(text);
          setText("");
        }}
        className="form"
      >
        <input
          className="todoInput"
          type="text"
          value={text}
          placeholder="What needs to be done?"
          onChange={(e) => setText(e.target.value)}
        />
        <button className="addButton">Add</button>
      </form>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.onAdd === nextProps.onAdd;
  },
);

export default TodoForm;
