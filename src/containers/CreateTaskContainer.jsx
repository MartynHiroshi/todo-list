import { useState } from "react";
import CollapseButton from "../elements/CollapseButton";

export default function CreateTaskContainer({ isOpened, setIsCollapsed, taskList, setTaskList }) {
  return (
    <div className="task-container">
      <h1>Создание задачи</h1>
      <CollapseButton isOpened={isOpened} setIsCollapsed={setIsCollapsed} sectionName="createSection" />
      {isOpened["createSection"] && <TaskForm taskList={taskList} setTaskList={setTaskList} />}
    </div>
  );
}

function TaskForm({ taskList, setTaskList }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskPriority, setTaskPriority] = useState("low");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [id, setId] = useState(0);

  return (
    <form
      action=""
      className="task-form"
      onSubmit={(event) =>
        handleSubmit(
          event,
          taskTitle,
          taskPriority,
          taskDeadline,
          id,
          setId,
          taskList,
          setTaskList,
          setTaskTitle,
          setTaskPriority,
          setTaskDeadline
        )
      }
    >
      <label htmlFor="taskName">Название задачи</label>
      <input
        value={taskTitle}
        name="taskName"
        type="text"
        placeholder="Task title"
        required
        onChange={(event) => setTaskTitle(event.target.value)}
      ></input>

      <label htmlFor="priority">Приоритетность задачи</label>
      <select value={taskPriority} name="priority" id="priority" onChange={(event) => setTaskPriority(event.target.value)}>
        <option value="low" selected>
          Низкий
        </option>
        <option value="medium">Средний</option>
        <option value="high">Высокий</option>
      </select>

      <label htmlFor="executionDate">Дата выполнения</label>
      <input
        value={taskDeadline}
        name="executionDate"
        type="datetime-local"
        required
        onChange={(event) => setTaskDeadline(event.target.value)}
      ></input>

      <button type="submit">Добавить задачу</button>
    </form>
  );
}

function handleSubmit(
  event,
  taskTitle,
  taskPriority,
  taskDeadline,
  id,
  setId,
  taskList,
  setTaskList,
  setTaskTitle,
  setTaskPriority,
  setTaskDeadline
) {
  // предотвращает перезагрузку страницы браузера при отправке
  event.preventDefault();
  const currentId = getAndIncrementId(id, setId);

  setTaskList([
    ...taskList,
    { title: `#${currentId} ${taskTitle.trim()}`, priority: taskPriority, deadline: taskDeadline, id: currentId, isCompleted: false },
  ]);

  setTaskTitle("");
  setTaskPriority("low");
  setTaskDeadline("");
}

function getAndIncrementId(id, setId) {
  setId((prev) => prev + 1);
  return id + 1;
}
