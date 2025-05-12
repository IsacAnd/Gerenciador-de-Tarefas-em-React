import { useState } from "react";
import "../styles/addtask.css";

function AddTask(props) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  function addTask() {
    let id = Math.max(...props.tasks.map((task) => task.id), 0);

    let task = {
      id: id + 1,
      title,
      desc,
      isCompleted: false,
    };

    props.onAddTaskClick(task);
  }

  return (
    <div className="addtask-container">
      <h2>Adicionar tarefa</h2>
      <input
        type="text"
        className="addtask-input"
        placeholder="Nome da tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        className="addtask-input"
        placeholder="Descrição da tarefa"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button
        placeholder="Adicionar"
        type="submit"
        className="addtask-submit"
        onClick={() => {
          addTask();
        }}
      >
        Adicionar
      </button>
    </div>
  );
}

export default AddTask;
