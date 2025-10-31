import { useState } from "react"
import StatsBarChart from "../../components/StatsBarChart/StatsBarChart"
import StatsPieChart from "../../components/StatsPiechart/StatsPieChart"
import StatsTable from "../../components/StatsTable/StatsTable"
import TaskNav from "../../components/TasksNav/TaskNav"
import { useTasks } from "../../contexts/TaskContext"
import { calculateStats, filteredTasksStats } from "../../utils/statsUtils"
import "./Stats.css"

const Stats = () => {
  const { tasks } = useTasks()
  const [activeFilter, setActiveFilter] = useState("Aujourd'hui")

  const filteredTasks = filteredTasksStats(tasks, activeFilter)
  const stats = calculateStats(filteredTasks)

  return (
    <div className="stats-page-container">
      <h2 className="stats-title">Statistiques</h2>
      <TaskNav
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        showYearFilter={true}
      />
      {filteredTasks.length === 0 ? (
        <div className="stats-empty">
          <span>
            {activeFilter
              ? `Aucune tâche pour ${activeFilter}`
              : "Acune statistique disponible"}
          </span>
        </div>
      ) : (
        <>
          <div className="stats-container">
            <div className="stats-global">
              <StatsTable stats={stats} />
              <StatsBarChart stats={stats} />
            </div>
            <div className="stats-categories">
              <StatsPieChart stats={stats} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Stats
