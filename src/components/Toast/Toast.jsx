import "./toast.css";
import { X } from "lucide-react";

function Toast(props) {
  function clearToast() {
    const toast = document.getElementsByClassName("toast-container")[0];

    toast.style.display = "none";
  }

  return (
    <div className={`toast-container ${props.toastType}`}>
      <div className="toast-message">
        <h4>{props.toastMessage}</h4>
      </div>
      <div onClick={clearToast} className="close-toast">
        <X size={18} />
      </div>
    </div>
  );
}

export default Toast;
