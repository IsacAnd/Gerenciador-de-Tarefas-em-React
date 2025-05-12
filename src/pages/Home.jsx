import { useEffect, useState } from "react";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import Toast from "../components/Toast/Toast";
import "../styles/home.css";

function Home() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));

    if (!searchQuery) {
      return setFilteredTasks(tasks);
    }

    setFilteredTasks(
      tasks.filter((task) => {
        return task.title.toLowerCase().includes(searchQuery.toLowerCase());
      })
    );
  }, [tasks]);

  function onAddTaskClick(task) {
    if (task.id == undefined || !task.title || !task.desc) {
      setShowToast(true);
      setToastMessage("Preencha todos os campos!");
      setToastType("failure");
      setTimeout(() => setShowToast(false), 3000);

      return null;
    }

    setTasks([...tasks, task]);

    setShowToast(true);
    setToastMessage("Tarefa adicionada com sucesso!");
    setToastType("success");
    setTimeout(() => setShowToast(false), 3000);
  }

  function onDeleteTaskClick(index) {
    let newTasks = tasks.filter((item) => item.id != index);

    setTasks(newTasks);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function onDoneTaskClick(index) {
    let newTasks = tasks.map((task) => {
      if (index == task.id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });

    setTasks(newTasks);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function onSearch(searchQuery) {
    if (!searchQuery) return setFilteredTasks(tasks);

    setFilteredTasks(
      tasks.filter((task) => {
        return task.title.toLowerCase().includes(searchQuery.toLowerCase());
      })
    );
  }

  return (
    <div className="home-container">
      {showToast && <Toast toastMessage={toastMessage} toastType={toastType} />}
      <h1 id="home-container-h2">Gerenciador de tarefas</h1>
      <div className="add-task">
        <AddTask onAddTaskClick={onAddTaskClick} tasks={tasks} />
      </div>
      <div className="task-list">
        <TaskList
          onSearch={onSearch}
          onDoneTaskClick={onDoneTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
          tasks={filteredTasks}
          setSearchQuery={setSearchQuery}
        />
      </div>
    </div>
  );
}

export default Home;
