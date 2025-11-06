import { Calendar, Check, Clock, Tag, Trash2 } from "lucide-react"
import { useState } from "react"
import { useTasks } from "../../contexts/TaskContext"
import "./Task.css"

const Task = ({ task, variant = "default", onTaskClick }) => {
  const { deleteTask, toggleComplete } = useTasks()
  const [isCompleting, setIsCompleting] = useState(false)

  const isModalView = variant === "modal"

  // formater date
  const formatDate = (isoDate) => {
    if (!isoDate) return null
    const date = new Date(isoDate)
    const options = { day: "numeric", month: "numeric", year: "numeric" }
    return date.toLocaleDateString("fr-FR", options)
  }

  // calcul temps depuis creation de la tache
  const getTimeAgo = (isoDate) => {
    if (!isoDate) return null
    const now = new Date()
    const created = new Date(isoDate)
    const diffMonths = now - created
    const diffDays = Math.floor(diffMonths / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Aujourd'hui"
    if (diffDays === 1) return "Hier"
    if (diffDays < 7) return `Il y a ${diffDays} jours`
    return formatDate(isoDate)
  }

  // verifier si deadline depassee
  const deadlineStatus = (deadline) => {
    if (!deadline) return null
    const now = new Date()
    const deadlineDate = new Date(deadline)
    const diffMonths = deadlineDate - now
    const diffDays = Math.floor(diffMonths / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return "overdue"
    if (diffDays === 0) return "today"
    if (diffDays <= 3) return "soon"
    return "normal"
  }

  // animation terminee
  const handleComplete = () => {
    setIsCompleting(true)
    setTimeout(() => {
      toggleComplete(task.id)
      setIsCompleting(false)
    }, 500)
  }

  // gestion du clique sur la tache (view normale)
  const handleTaskClick = (e) => {
    if (e.target.closest("button")) return
    if (!isModalView && onTaskClick) {
      onTaskClick(task)
    }
  }

  return (
    <div
      className={`task ${isCompleting ? "task--completing" : ""}
    ${task.priority ? `task__priority-${task.priority}` : ""}
    ${isModalView ? "task--modal" : ""} `}
      onClick={handleTaskClick}>
      {!isModalView && (
        <button
          className="task__btn task__btn--delete"
          onClick={() => deleteTask(task.id)}>
          <Trash2 size={25} />
        </button>
      )}

      <div className="task__content">
        <h4 className="task__name">{task.name}</h4>

        {/* metadonnees */}
        <div className="task__metadata">
          {/* categorie */}
          {task.category && (
            <span className="task__category">
              <Tag size={12} />
              {task.category}
            </span>
          )}
          {/* date d'ajout */}
          <span className="task__date task__date--created">
            <Clock size={12} />
            {getTimeAgo(task.initDate)}
          </span>
          {/* deadline */}
          {task.deadline && (
            <span
              className={`task__date task__date--deadline task__date--${deadlineStatus(
                task.deadline
              )}`}>
              <Calendar size={12} />
              {formatDate(task.deadline)}
            </span>
          )}
        </div>
      </div>
      {!isModalView && (
        <button
          className="task__btn task__btn--complete"
          onClick={handleComplete}
          disabled={isCompleting}>
          <Check size={25} />
        </button>
      )}
    </div>
  )
}

export default Task
