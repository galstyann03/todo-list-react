import "./TodoFooter.css";
import { memo } from "react";

const TodoFooter = memo(
  ({ todos, onClearCompleted }) => {
    return (
      <div className="footer">
        <div className="completed-message">
          {todos.filter((todo) => todo.isCompleted).length}/{todos.length}{" "}
          Completed
        </div>
        <button className="clear-completed-button" onClick={onClearCompleted}>
          Clear Completed
        </button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.onClearCompleted === nextProps.onClearCompleted &&
      JSON.stringify(prevProps.todos) === JSON.stringify(nextProps.todos)
    );
  },
);

export default TodoFooter;
