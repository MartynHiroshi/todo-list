import { useState } from "react";
import CollapseButton from "../elements/CollapseButton";
import Task from "../elements/Task";

export default function CompletedTaskContainer({ taskList, setTaskList }) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="completed-task-container">
      <h2>Завершенные задачи</h2>
      <CollapseButton isOpened={isOpened} onClick={() => setIsOpened((prev) => !prev)} />
      {isOpened && (
        <ul className="task-list">
          {taskList
            .filter((task) => task.isCompleted)
            .map((taskObj) => (
              <Task key={taskObj.id} {...taskObj} setTaskList={setTaskList} />
            ))}
        </ul>
      )}
    </div>
  );
}
