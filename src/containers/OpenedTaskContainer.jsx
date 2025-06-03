import { useState } from "react";
import CollapseButton from "../elements/CollapseButton";
import Task from "../elements/Task";

export default function OpenedTaskContainer({ isOpened, setIsCollapsed, taskList, setTaskList }) {
  const [sortType, setSortType] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  function handleSortChange(currentType, currentDirection) {
    const sortFunctions = {
      id: sortById,
      date: sortByDate,
      priority: sortByPriority,
    };
    // вместо свича можно сделать объект и вызывать на его поля () получая такую функцию
    sortFunctions[currentType]?.(currentDirection);
  }

  function sortById(currentDirection) {
    setTaskList((prev) =>
      prev.sort((a, b) => {
        return currentDirection === "asc" ? a.id - b.id : b.id - a.id;
      })
    );
  }

  function sortByDate(currentDirection) {
    setTaskList((prev) =>
      prev.sort((a, b) => {
        return currentDirection === "asc" ? new Date(a.deadline) - new Date(b.deadline) : new Date(b.deadline) - new Date(a.deadline);
      })
    );
  }

  function sortByPriority(currentDirection) {
    const priorityOrder = { low: 1, medium: 2, high: 3 };

    setTaskList((prev) =>
      prev.sort((a, b) => {
        return currentDirection === "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      })
    );
  }

  return (
    <div className="task-container">
      <h2>Список задач</h2>
      <CollapseButton isOpened={isOpened} setIsCollapsed={setIsCollapsed} sectionName="openedSection" />
      {isOpened["openedSection"] && (
        <>
          <div className="sort-controls">
            <select
              className="sort-button"
              value={sortType}
              name="sortType"
              id="sortType"
              onChange={(event) => {
                const newType = event.target.value;
                setSortType(newType);
                handleSortChange(newType, sortDirection);
              }}
            >
              <option value="date">По дате</option>
              <option value="priority">По приоритетности</option>
              <option value="id">По номеру задачи</option>
            </select>

            <select
              className="sort-button"
              value={sortDirection}
              name="sortDirection"
              id="sortDirection"
              onChange={(event) => {
                const newDirection = event.target.value;
                setSortDirection(newDirection);
                handleSortChange(sortType, newDirection);
              }}
            >
              <option value="asc">&uarr;</option>
              <option value="desc">&darr;</option>
            </select>
          </div>
          <ul className="task-list">
            {taskList
              .filter((task) => !task.isCompleted)
              .map((taskObj) => (
                <Task key={taskObj.id} {...taskObj} setTaskList={setTaskList} />
              ))}
          </ul>
        </>
      )}
    </div>
  );
}
