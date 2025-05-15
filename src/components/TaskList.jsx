import "../styles/tasklist.css";
import { X } from "lucide-react";
import { Check } from "lucide-react";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchTask from "./SearchTask";

function TaskList(props) {
  const navigate = useNavigate();

  function onEditTaskClick(index) {
    navigate(`/task/?id=${index}`);
  }

  return (
    <div className="tasklist-container">
      <h2>Lista de tarefas</h2>
      <SearchTask
        onSearch={props.onSearch}
        setSearchQuery={props.setSearchQuery}
      />
      <ul className="tasklist">
        {props.tasks.length === 0 ? (
          <li>Sem tasks a serem exibidas!</li>
        ) : (
          props.tasks.map((task, index) => (
            <li key={index} className={task.isCompleted ? `isCompleted` : null}>
              <div className="task-title">
                <h4
                  style={{ textDecoration: task.isCompleted && "line-through" }}
                >
                  {task.title} {task.isCompleted && <Check size={18} />}
                </h4>
                <div className="task-options">
                  <button
                    onClick={() => {
                      props.onDoneTaskClick(task.id);
                    }}
                    className="task-option-item"
                  >
                    <Check id="done-task" size={18} color="green" />
                  </button>
                  <button
                    onClick={() => onEditTaskClick(task.id)}
                    className="task-option-item"
                  >
                    <Pencil id="edit-task" size={18} color="gray" />
                  </button>
                  <button
                    onClick={() => props.onDeleteTaskClick(task.id)}
                    className="task-option-item"
                  >
                    <X id="delete-task" size={18} color="red" />
                  </button>
                </div>
              </div>
              <p>{task.desc}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TaskList;
