import React, { useState } from "react";
import API from "../services/api";

function TaskForm({ refresh }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleCreate = async () => {
    await API.post("/tasks", {
      title,
      description: desc,
      dueDate,
      priority: "Medium",
    });
    setTitle("");
    setDesc("");
    setDueDate("");
    refresh();
  };

  return (
    <div>
      <h3>Create Task</h3>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" /><br />
      <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" /><br />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /><br />
      <button onClick={handleCreate}>Add Task</button>
    </div>
  );
}

export default TaskForm;
