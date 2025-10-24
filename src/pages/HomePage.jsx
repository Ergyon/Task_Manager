import Task from "../components/Task/Task"
import TaskForm from "../components/TaskForm/TaskForm"
import { useTasks } from "../contexts/TaskContext"
import "../pages/HomePage.css"

const HomePage = () => {
  const { tasks } = useTasks()
  return (
    <div className="home-container">
      <h2 className="home-title">Mes tâches</h2>
      <TaskForm />
      <div className="tasklist-container">
        {tasks
          .filter((task) => !task.isComplete)
          .map((task) => (
            <Task key={task.id} task={task} />
          ))}
      </div>
    </div>
  )
}
export default HomePage
