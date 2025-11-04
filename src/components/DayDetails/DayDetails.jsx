import { Check, Minus } from "lucide-react"
import { useTasks } from "../../contexts/TaskContext.jsx"
import { sortTasks } from "../../utils/taskFilter.js"
import { formatSelectedDate, getTasksDay } from "../../utils/utils.js"
import "./DayDetails.css"

const DayDetails = ({ selectedDate, onClose }) => {
  const { tasks, toggleComplete } = useTasks()

  const selectedDateObj = new Date(selectedDate.split("/").reverse().join("-"))
  const dayTasks = getTasksDay(tasks, selectedDateObj)

  const sortedDayTasks = sortTasks(dayTasks, true)

  const handleToggleConplete = (taskId) => {
    toggleComplete(taskId)
  }

  return (
    <div className="day-details">
      <div className="day-details__header">
        <h3 className="day-details__title">Détails du jour</h3>
        <button className="day-details__close" onClick={onClose}>
          <Minus size={25} />
        </button>
      </div>
      <h4 className="day-details__date">{formatSelectedDate(selectedDate)}</h4>
      <div className="day-details__summary">
        {sortedDayTasks.length !== 0 && (
          <h4 className="day-details__summary__title">Vos objectifs</h4>
        )}
        <div className="day-details__tasks">
          {/* si aucune taches */}
          {sortedDayTasks.length === 0 ? (
            <div className="day-details__empty">
              Vous n'avez rien de prévu pour le moment
            </div>
          ) : (
            // liste des tache du jour selectionne
            sortedDayTasks.map((task) => (
              <div
                key={task.id}
                className={`day-details__task ${
                  task.isComplete ? "day-details__task--completed" : ""
                } ${
                  task.priority ? `day-details__task--priority-${task.priority}` : ""
                }`}>
                <span className="day-details__task-name">{task.name}</span>

                <div className="day-details__task-data">
                  <span className="day-details__initDate">
                    {`${new Date(task.initDate).toLocaleDateString("fr-FR")}`}
                  </span>

                  {task.category && (
                    <span className="day-details__task-category">
                      {/* <Tag size={12} /> */}
                      {task.category}
                    </span>
                  )}

                  {task.deadline && (
                    <span className="day-details__task-deadline">
                      {new Date(task.deadline).toLocaleDateString("fr-FR")}
                    </span>
                  )}
                </div>
                <span
                  className={`day-details__task-toggle ${
                    task.isComplete ? "day-details__task-toggle--completed" : ""
                  }`}
                  onClick={() => handleToggleConplete(task.id)}
                  aria-label="Terminer la tâche">
                  <Check size={15} strokeWidth={2} />
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default DayDetails
