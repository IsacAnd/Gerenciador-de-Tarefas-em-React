import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/task.css";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Toast from "../components/Toast/Toast";

function Task() {
  const [searchParms] = useSearchParams();
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")));
  const [currentTask, setCurrentTask] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const id = searchParms.get("id");

    const task = savedTasks.find((task) => task.id == id);

    setCurrentTask(task);

    if (task) {
      setCurrentTask(task);
      setTitle(task.title);
      setDesc(task.desc);
    }
  }, []);

  function backToHome() {
    navigate(-1);
  }

  function onEditTaskClick(id) {
    if (!currentTask) return;

    const newTask = {
      id,
      title: title,
      desc: desc,
    };

    const updatedTasks = tasks.map((task) => {
      return (task = task.id == id ? newTask : task);
    });

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    navigate(-1);
    setShowToast(true);
    setToastMessage("Tarefa adicionada com sucesso!");
    setToastType("success");
    setTimeout(() => setShowToast(false), 3000);
  }

  return (
    <div className="container">
      {showToast && <Toast toastMessage={toastMessage} toastType={toastType} />}
      <button onClick={backToHome} id="backtohome-button">
        <ArrowLeft />
      </button>
      <h2>Editar tarefa</h2>
      <div className="edit-task-container">
        <div className="input-container">
          <p>Título da tarefa</p>
          <input
            name="title"
            value={title}
            type="text"
            className="edit-input"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-container">
          <p>Descrição da tarefa</p>
          <input
            name="desc"
            value={desc}
            type="text"
            className="edit-input"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="submit-container">
          <button
            onClick={() => onEditTaskClick(searchParms.get("id"))}
            className="submit-button"
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Task;
