import TodoForm from "./Components/Form/TodoForm.jsx";
import TodoList from "./Components/List/TodoList.jsx";
import TodoFooter from "./Components/Footer/TodoFooter.jsx";
import { createContext, useCallback, useMemo, useReducer } from "react";
import "./App.css";

const initialState = [
    {
        id: Math.random(),
        text: "Learn JS",
        isCompleted: false,
    },
    {
        id: Math.random(),
        text: "Learn CSS",
        isCompleted: false,
    },
    {
        id: Math.random(),
        text: "Learn React",
        isCompleted: false,
    },
];

function reducer(state, action) {
    switch (action.type) {
        case "add":
            return [
                ...state,
                {
                    id: Math.random(),
                    text: action.payload.text,
                    isCompleted: false,
                },
            ];

        case "delete":
            return state.filter((todo) => todo.id !== action.payload.deletedTodo.id);

        case "update":
            return state.map((todo) =>
                todo.id === action.payload.updatedTodo.id
                    ? action.payload.updatedTodo
                    : todo,
            );

        case "clearCompleted":
            return state.filter((todo) => !todo.isCompleted);
    }
}

export const ListContext = createContext(undefined);

function App() {
    const [todos, dispatch] = useReducer(reducer, initialState);

    const handleOnAdd = useCallback(
        (text) =>
            dispatch({
                type: "add",
                payload: {
                    text,
                },
            }),
        [],
    );

    const handleOnClearCompleted = useCallback(() => {
        dispatch({
            type: "clearCompleted",
        });
    }, []);

    const handleOnDelete = useCallback(
        (deletedTodo) =>
            dispatch({
                type: "delete",
                payload: {
                    deletedTodo,
                },
            }),
        [],
    );

    const handleOnChange = useCallback(
        (updatedTodo) =>
            dispatch({
                type: "update",
                payload: {
                    updatedTodo,
                },
            }),
        [],
    );

    const contextValues = useMemo(
        () => ({
            onChange: handleOnChange,
            onDelete: handleOnDelete,
        }),
        [handleOnChange, handleOnDelete],
    );

    return (
        <div className="App">
            <header>
                <h1 className="todoAppTitle">Todos</h1>
            </header>
            <TodoForm onAdd={handleOnAdd} />
            <ListContext.Provider value={contextValues}>
                <TodoList todos={todos} />
            </ListContext.Provider>
            <TodoFooter todos={todos} onClearCompleted={handleOnClearCompleted} />
        </div>
    );
}

export default App;