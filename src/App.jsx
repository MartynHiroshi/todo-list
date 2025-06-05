import { useState } from "react";
import CompletedTaskContainer from "./containers/CompletedTaskContainer";
import CreateTaskContainer from "./containers/CreateTaskContainer";
import OpenedTaskContainer from "./containers/OpenedTaskContainer";

export default function App() {
  const [taskList, setTaskList] = useState([
    { title: "1", priority: "low", deadline: "2025-06-12T13:21", id: 1749104412784 },
    { title: "2", priority: "high", deadline: "2025-06-12T13:22", id: 1749104412785 },
    { title: "3", priority: "medium", deadline: "2025-06-12T13:23", id: 1749104412786 },
    { title: "4", priority: "low", deadline: "2025-06-12T13:21", id: 1749104412787 },
    { title: "5", priority: "high", deadline: "2025-06-12T13:22", id: 1749104412788 },
    { title: "6", priority: "medium", deadline: "2025-06-12T13:23", id: 1749104412789 },
  ]);

  const containers = [CreateTaskContainer, OpenedTaskContainer, CompletedTaskContainer];

  return (
    <div className="app">
      {/*В данном случае можно использовать индекс так как это статика*/}
      {/*Состояние открытый/закрытый лучше держать внутри контейнера, так как каждый управляет только собой*/}
      {containers.map((Component, index) => (
        <Component key={Component.name + index} taskList={taskList} setTaskList={setTaskList}></Component>
      ))}
    </div>
  );
}
