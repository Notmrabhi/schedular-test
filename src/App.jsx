import { useState } from "react";
import "./App.css";

function App() {
  const [addTodo, setAddTodo] = useState([]);
  const [value, setValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTodo = () => {
    if (value.trim() === "") return;

    if (editIndex !== null) {
      // If we are editing, update the todo at that index
      const updatedTodos = [...addTodo];
      updatedTodos[editIndex] = value;
      setAddTodo(updatedTodos);
      setEditIndex(null); // reset edit mode
    } else {
      // Otherwise, add a new todo
      setAddTodo([...addTodo, value]);
    }

    setValue(""); // clear input field
  };

  const handleEditTodo = (index) => {
    setValue(addTodo[index]);
    setEditIndex(index);
  };

  const handleDeleteTodo = (index) => {
    setAddTodo(addTodo.filter((_, i) => i !== index));
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>ToDo App</h1>
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", padding: "10px" }}
      >
        <input
          type="text"
          placeholder="Add a new todo"
          style={{ padding: "10px", width: "300px" }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
        />
        <button onClick={handleAddTodo}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      {addTodo.map((todo, index) => (
        <li
          style={{
            listStyle: "none",
            padding: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          key={index}
        >
          <span>{todo}</span>
          <button
            style={{ marginLeft: "10px", cursor: "pointer" }}
            onClick={() => handleEditTodo(index)}
          >
            Edit
          </button>
          <button
            style={{ marginLeft: "5px", cursor: "pointer" }}
            onClick={() => handleDeleteTodo(index)}
          >
            Delete
          </button>
        </li>
      ))}
    </>
  );
}

export default App;
