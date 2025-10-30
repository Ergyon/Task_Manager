import TaskNav from "../../components/TasksNav/TaskNav"
import { useTasks } from "../../contexts/TaskContext"
import { useTasksFilter } from "../../utils/taskFilter"
import "./Stats.css"

const Stats = () => {
  const { tasks } = useTasks()
  const { activeFilter, setActiveFilter } = useTasksFilter(tasks)

  return (
    <div className="stats-container">
      <h2 className="stats-title">Statistiques</h2>
      <TaskNav activeFilter={activeFilter} onFilterChange={setActiveFilter} />
    </div>
  )
}

export default Stats
