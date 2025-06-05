import { useState } from "react";
import CreateTaskContainer from "./containers/CreateTaskContainer";
import OpenedTaskContainer from "./containers/OpenedTaskContainer";
import CompletedTaskContainer from "./containers/CompletedTaskContainer";

export default function App() {
  // const [isOpened, setIsCollapsed] = useState({
  //   createSection: true,
  //   openedSection: false,
  //   completedSection: false,
  // });
  const [taskList, setTaskList] = useState([]);

  const containers = [CreateTaskContainer, OpenedTaskContainer, CompletedTaskContainer];

  return (
    <div className="app">
      {containers.map((Component, index) => (
        <Component key={Component + index} taskList={taskList} setTaskList={setTaskList}></Component>
      ))}
    </div>
  );
}
