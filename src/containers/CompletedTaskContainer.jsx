import CollapseButton from "../elements/CollapseButton";
import Task from "../elements/Task";

export default function CompletedTaskContainer({ isOpened, setIsCollapsed, taskList, setTaskList }) {
  return (
    <div className="completed-task-container">
      <h2>Завершенные задачи</h2>
      <CollapseButton isOpened={isOpened} setIsCollapsed={setIsCollapsed} sectionName="completedSection" />
      {isOpened["completedSection"] && (
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
