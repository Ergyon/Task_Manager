import { useTasks } from "../../contexts/TaskContext"

const Task = ({ task }) => {
  const { deleteTask, toggleComplete } = useTasks()

  return (
    <div className="task">
      <button className="task-delete" onClick={() => deleteTask(task.id)}>
        Supprimer
      </button>
      <h4 className="task-name">{task.name}</h4>
      <button className="task-complete" onClick={() => toggleComplete(task.id)}>
        Terminer
      </button>
    </div>
  )
}

export default Task
