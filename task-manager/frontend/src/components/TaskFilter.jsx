export default function TaskFilter({ filter, setFilter }) {
  const btn = (key, label) => (
    <button
      onClick={() => setFilter(key)}
      className={`btn btn-filter ${filter === key ? "is-active" : ""}`}
    >
      {label}
    </button>
  );

  return (
    <div className="filters-buttons">
      {btn("all", "All")}
      {btn("completed", "Completed")}
      {btn("pending", "Pending")}
    </div>
  );
}
