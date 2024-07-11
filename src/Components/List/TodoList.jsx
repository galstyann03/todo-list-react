import TodoListItem from "./TodoListItem.jsx";
import "./TodoList.css";
import { memo, useEffect } from "react";

const TodoList = memo(
  ({ todos }) => {
    useEffect(() => {
      document.title = `Todo ${todos.length}`;
    }, [todos]);

    return (
      <div className="list">
        {todos.map((todo) => {
          return <TodoListItem key={todo.id} todo={todo} />;
        })}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return JSON.stringify(prevProps.todos) === JSON.stringify(nextProps.todos);
  },
);

export default TodoList;
