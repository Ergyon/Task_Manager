import "./TaskNav.css"

const TaskNav = ({ activeFilter, onFilterChange }) => {
  const filters = ["Toutes", "Aujourd'hui", "Cette semaine", "Ce mois-ci"]

  const handleClick = (filter) => {
    if (activeFilter === "Toutes") {
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
                activeFilter === filter ? "task-nav__link--active" : ""
              }`}
              onClick={() => handleClick(filter)}
            >
              {filter}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TaskNav
