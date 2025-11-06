import { useState } from "react"
import { useNavigate } from "react-router-dom"
import LaunchTaskModal from "../../components/LaunchTaskModal/LaunchTaskModal"
import Task from "../../components/Task/Task"
import TaskForm from "../../components/TaskForm/TaskForm"
import TaskNav from "../../components/TasksNav/TaskNav"
import { useTasks } from "../../contexts/TaskContext"
import { sortTasks, useTasksFilter } from "../../utils/taskFilter"
import "./HomePage.css"

const HomePage = () => {
  const { tasks } = useTasks()
  const { activeFilter, setActiveFilter, filteredTasks } = useTasksFilter(tasks)
  const sortedTasks = sortTasks(filteredTasks, false)

  const [launchModalOpen, setLaucnhModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const navigate = useNavigate()

  // gerer le clic sur une tache
  const handleTaskClick = (task) => {
    setSelectedTask(task)
    setLaucnhModalOpen(true)
  }

  // confirmer lancement de la tache
  const handleConfirmLaunch = () => {
    setLaucnhModalOpen(false)
    navigate(`/timer/${selectedTask.id}`)
  }

  return (
    <div className="home-container">
      <h2 className="home-title">Mes tâches</h2>
      <TaskNav activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <TaskForm />
      <div className="tasklist-container">
        {sortedTasks.length === 0 ? (
          <span className="tasklist-empty">
            {activeFilter
              ? `Aucune tâche pour ${activeFilter.toLowerCase()}.`
              : "Aucune tâche en cours."}
          </span>
        ) : (
          sortedTasks.map((task) => (
            <Task key={task.id} task={task} onTaskClick={handleTaskClick} />
          ))
        )}
      </div>
      {launchModalOpen && selectedTask && (
        <LaunchTaskModal
          isOpen={launchModalOpen}
          onClose={() => setLaucnhModalOpen(false)}
          onConfirm={handleConfirmLaunch}
          taskName={selectedTask?.name || ""}
        />
      )}
    </div>
  )
}
export default HomePage
