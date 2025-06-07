export default function Task({ title, priority, deadline, id, isCompleted, setTaskList, isOverdue }) {
  return (
    <li className={`task-item ${priority} ${isOverdue && "overdue"}`}>
      <div className="task-info">
        <p>
          {title}{" "}
          <strong>
            ({priority}){isOverdue && " ПРОСРОЧЕНА"}
          </strong>
        </p>
        <p className="task-deadline">{`${isCompleted ? "Закрыта:" : "Завершить до:"} ${deadline}`}</p>
      </div>
      <div className="task-buttons">
        {isCompleted || (
          <button className="complete-button" onClick={() => completeTask(setTaskList, id)}>
            Завершить
          </button>
        )}
        <button className="delete-button" onClick={() => deleteTask(setTaskList, id)}>
          Удалить
        </button>
      </div>
    </li>
  );
}

function deleteTask(setTaskList, taskId) {
  return setTaskList((prev) => prev.filter((task) => task.id !== taskId));
}

function completeTask(setTaskList, taskId) {
  return setTaskList((prev) => prev.map((task) => (task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task)));
}
