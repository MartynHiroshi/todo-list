export default function CollapseButton({ isOpened, setIsCollapsed, sectionName }) {
  return (
    <button className="close-button" onClick={() => setIsCollapsed((prev) => ({ ...prev, [sectionName]: !prev[sectionName] }))}>
      {isOpened[sectionName] ? "+" : "\u00D7"}
    </button>
  );
}
