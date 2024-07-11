import "./TodoListItem.css";
import { memo, useContext } from "react";
import {ListContext} from "../../App.jsx";

const TodoListItem = memo(
  ({ todo }) => {
    const { onDelete, onChange } = useContext(ListContext);

    return (
      <div className="listItem">
        <input
          type="checkbox"
          onChange={(e) => {
            onChange({
              ...todo,
              isCompleted: e.target.checked,
            });
          }}
          checked={todo.isCompleted}
          className="checkbox"
        />
        <div className="text">{todo.text}</div>
        <button className="delete-button" onClick={() => onDelete(todo)}>
          X
        </button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return JSON.stringify(prevProps.todo) === JSON.stringify(nextProps.todo);
  },
);

export default TodoListItem;
