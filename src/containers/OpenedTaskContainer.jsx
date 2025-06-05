import { useState, useEffect, useCallback } from "react";
import CollapseButton from "../elements/CollapseButton";
import Task from "../elements/Task";
import CustomSelect from "../elements/CustomSelect";

const sortOptions = [
  { value: "id", label: "По номеру задачи" },
  { value: "date", label: "По дате" },
  { value: "priority", label: "По приоритетности" },
];
const sortDirectionOptions = [
  { value: "asc", label: "↑" },
  { value: "desc", label: "↓" },
];

export default function OpenedTaskContainer({ taskList, setTaskList }) {
  const [sortType, setSortType] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isOpened, setIsOpened] = useState(false);

  const handleSortChange = useCallback(
    (currentType, currentDirection) => {
      const sortFunctions = {
        id: sortById,
        date: sortByDate,
        priority: sortByPriority,
      };
      sortFunctions[currentType]?.(currentDirection, setTaskList);
    },
    // сюда кладем лист что бы при добавлении задачи она  встала в необходимое место при выбранном типе сортировки а не упала в конец
    [setTaskList]
  );

  useEffect(() => {
    handleSortChange(sortType, sortDirection);
  }, [sortType, sortDirection, handleSortChange]);

  return (
    <div className="task-container">
      <h2>Список задач</h2>
      <CollapseButton isOpened={isOpened} onClick={() => setIsOpened((prev) => !prev)} />
      {isOpened && (
        <>
          <div className="sort-controls">
            <CustomSelect
              options={sortOptions}
              value={sortType}
              className="sort-button"
              onChange={(event) => {
                const newType = event.target.value;
                setSortType(newType);
              }}
            />
            <CustomSelect
              options={sortDirectionOptions}
              value={sortDirection}
              className="sort-button"
              onChange={(event) => {
                const newDirection = event.target.value;
                setSortDirection(newDirection);
              }}
            />
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

function sortById(currentDirection, setTaskList) {
  setTaskList((prev) =>
    [...prev].sort((a, b) => {
      return currentDirection === "asc" ? a.id - b.id : b.id - a.id;
    })
  );
}

function sortByDate(currentDirection, setTaskList) {
  setTaskList((prev) =>
    [...prev].sort((a, b) => {
      return currentDirection === "asc" ? new Date(a.deadline) - new Date(b.deadline) : new Date(b.deadline) - new Date(a.deadline);
    })
  );
}

function sortByPriority(currentDirection, setTaskList) {
  const priorityOrder = { low: 1, medium: 2, high: 3 };

  setTaskList((prev) =>
    [...prev].sort((a, b) => {
      return currentDirection === "asc"
        ? priorityOrder[a.priority] - priorityOrder[b.priority]
        : priorityOrder[b.priority] - priorityOrder[a.priority];
    })
  );
}
