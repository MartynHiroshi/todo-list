export default function CollapseButton({ isOpened, onClick }) {
  return (
    <button className="close-button" onClick={onClick}>
      {isOpened ? "▲" : "▼"}
    </button>
  );
}
