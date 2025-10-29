import Task from "../../components/Task/Task"
import TaskForm from "../../components/TaskForm/TaskForm"
import TaskNav from "../../components/TasksNav/TaskNav"
import { useTasks } from "../../contexts/TaskContext"
import { useTasksFilter } from "../../utils/taskFilter"
import "./HomePage.css"

const HomePage = () => {
  const { tasks } = useTasks()
  const { activeFilter, setActiveFilter, filteredTasks } = useTasksFilter(tasks)

  return (
    <div className="home-container">
      <h2 className="home-title">Mes tâches</h2>
      <TaskNav activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <TaskForm />
      <div className="tasklist-container">
        {filteredTasks.length === 0 ? (
          <span className="tasklist-empty">
            {activeFilter
              ? `Aucune tâche pour ${activeFilter}`
              : "Aucune tâche en cours"}
          </span>
        ) : (
          filteredTasks.map((task) => <Task key={task.id} task={task} />)
        )}
      </div>
    </div>
  )
}
export default HomePage
