export default function CollapseButton({ isOpened, onClick }) {
  // UI-компоненты должны быть максимально тупыми и не хранить в себе какой то логики, иначе они потеряют универсальность и переиспользуемость.
  return (
    <button className="close-button" onClick={onClick}>
      {isOpened ? "▲" : "▼"}
    </button>
  );
}
