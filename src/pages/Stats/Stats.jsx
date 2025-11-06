import { useState } from "react"
import StatsBarChart from "../../components/StatsBarChart/StatsBarChart"
import StatsPieChart from "../../components/StatsPiechart/StatsPieChart"
import StatsTable from "../../components/StatsTable/StatsTable"
import TaskModal from "../../components/TaskModal/TaskModal"
import TaskNav from "../../components/TasksNav/TaskNav"
import { useTasks } from "../../contexts/TaskContext"
import { getModaltasks, getModalTitle } from "../../utils/modalUtils"
import { calculateStats, filteredTasksStats } from "../../utils/statsUtils"
import "./Stats.css"

const Stats = () => {
  const { tasks } = useTasks()
  const [activeFilter, setActiveFilter] = useState("Aujourd'hui")
  const [modalOpen, setModalOpen] = useState(false)
  const [modalFilter, setModalFilter] = useState(null)

  const filteredTasks = filteredTasksStats(tasks, activeFilter)
  const stats = calculateStats(filteredTasks)

  const handleCardClick = (filter) => {
    setModalFilter(filter)
    setModalOpen(true)
  }

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
          <span>Aucune statistique disponible pour le moment.</span>
        </div>
      ) : (
        <>
          <div className="stats-container">
            <div className="stats-global">
              <StatsTable stats={stats} onCardClick={handleCardClick} />
              <StatsBarChart stats={stats} />
            </div>
            <div className="stats-categories">
              <StatsPieChart stats={stats} />
            </div>
          </div>

          <TaskModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            tasks={getModaltasks(modalFilter, stats)}
            title={getModalTitle(modalFilter)}
          />
        </>
      )}
    </div>
  )
}

export default Stats
