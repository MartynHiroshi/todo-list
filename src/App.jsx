import { useState } from "react";
import CreateTaskContainer from "./containers/CreateTaskContainer";
import OpenedTaskContainer from "./containers/OpenedTaskContainer";
import CompletedTaskContainer from "./containers/CompletedTaskContainer";

export default function App() {
  const [isOpened, setIsCollapsed] = useState({
    createSection: true,
    openedSection: false,
    completedSection: false,
  });
  const [taskList, setTaskList] = useState([]);
  let containerId = 0;

  const containers = [CreateTaskContainer, OpenedTaskContainer, CompletedTaskContainer];

  return (
    <div className="app">
      {containers.map((Component) => (
        <Component
          key={containerId++}
          isOpened={isOpened}
          setIsCollapsed={setIsCollapsed}
          taskList={taskList}
          setTaskList={setTaskList}
        ></Component>
      ))}
    </div>
  );
}
