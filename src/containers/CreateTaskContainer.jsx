import { useState } from "react";
import CustomSelect from "../components/customSelect";
import CollapseButton from "../elements/CollapseButton";

export default function CreateTaskContainer({ taskList, setTaskList }) {
  const [isOpened, setIsCollapsed] = useState(!false);
  return (
    <div className="task-container">
      <h1>Создание задачи</h1>
      <CollapseButton isOpened={isOpened} onClick={() => setIsCollapsed((prev) => !prev)} />
      {isOpened && <TaskForm taskList={taskList} setTaskList={setTaskList} />}
    </div>
  );
}

function TaskForm({ taskList, setTaskList }) {
  // Очевидно что лучше делать объект нежели состояние на каждый ключ сущности
  const [task, setTask] = useState({
    title: "",
    priority: "low",
    deadline: "",
    id: Date.now(),
  });
  const priorityOptions = [
    {
      value: "low",
      label: "Низкий",
    },
    {
      value: "medium",
      label: "Средний",
    },
    {
      value: "high",
      label: "Высокий",
    },
  ];

  return (
    <form
      action=""
      className="task-form"
      onSubmit={(event) => {
        event.preventDefault();
        // пределывать к title #{id} странно потому что ты меняешь title который написал юзер

        setTaskList([...taskList, task]);
        setTask({
          title: "",
          priority: "low",
          deadline: "",
          id: Date.now(),
        });
      }}>
      <label htmlFor="taskName">Название задачи</label>
      <input
        value={task.title}
        name="taskName"
        type="text"
        placeholder="Task title"
        required
        onChange={(event) => setTask({ ...task, title: event.target.value })}></input>

      <label htmlFor="priority">Приоритетность задачи</label>
      <CustomSelect
        options={priorityOptions}
        value={task.priority}
        onChange={(event) => setTask({ ...task, priority: event.target.value })}
      />

      <label htmlFor="executionDate">Дата выполнения</label>
      <input
        value={task.deadline}
        name="executionDate"
        type="datetime-local"
        required
        onChange={(event) => setTask({ ...task, deadline: event.target.value })}></input>

      <button type="submit">Добавить задачу</button>
    </form>
  );
}
