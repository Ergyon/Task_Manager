import "./TaskNav.css"

const TaskNav = ({ activeFilter, onFilterChange, showYearFilter }) => {
  const filters = showYearFilter
    ? ["Aujourd'hui", "Cette semaine", "Ce mois-ci", "Cette année", "Toutes"]
    : ["Aujourd'hui", "Cette semaine", "Ce mois-ci", "Toutes"]

  const handleClick = (filter) => {
    if (filter === "Toutes") {
      onFilterChange(null)
    } else if (activeFilter === filter) {
      onFilterChange(null)
    } else {
      onFilterChange(filter)
    }
  }

  return (
    <nav className="task-nav">
      <ul className="task-nav__list">
        {filters.map((filter) => (
          <li key={filter}>
            <button
              className={`task-nav__link ${
                (filter === "Toutes" && !activeFilter) || activeFilter === filter
                  ? "task-nav__link--active"
                  : ""
              }`}
              onClick={() => handleClick(filter)}>
              {filter}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TaskNav
