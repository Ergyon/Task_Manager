import { Minus, Tag } from "lucide-react"
import { useTasks } from "../../contexts/TaskContext.jsx"
import { formatSelectedDate, getTasksDay } from "../../utils/utils.js"
import "./DayDetails.css"

const DayDetails = ({ selectedDate, onClose }) => {
  const { tasks } = useTasks()

  const selectedDateObj = new Date(selectedDate.split("/").reverse().join("-"))

  const dayTasks = getTasksDay(tasks, selectedDateObj)

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
        {dayTasks.length !== 0 && (
          <h4 className="day-details__summary__title">Vos objectifs</h4>
        )}
        <div className="day-details__tasks">
          {dayTasks.length === 0 ? (
            <div className="day-details__empty">
              Vous n'avez rien de prévu pour le moment
            </div>
          ) : (
            dayTasks.map((task) => (
              <div
                key={task.id}
                className={`day-details__task ${
                  task.isComplete ? "day-details__task--completed" : ""
                } ${
                  task.priority
                    ? `day-details__task--priority-${task.priority}`
                    : ""
                }`}
              >
                <div className="day-details__task-header">
                  <span className="day-details__task-name">
                    {task.name}
                    {task.priority && (
                      <span
                        className={`priority-badge priority-${task.priority}`}
                      ></span>
                    )}
                  </span>
                </div>

                <div className="day-details__task-data">
                  {task.category && (
                    <span className="day-details__task-category">
                      <Tag size={12} />
                      {task.category}
                    </span>
                  )}

                  {task.deadline && (
                    <span className="day-details__task-deadline">
                      {/* <Calendar size={12} /> */}
                      {new Date(task.deadline).toLocaleDateString("fr-FR")}
                    </span>
                  )}

                  {!task.deadline && (
                    <span className="day-details__task-nodeadline">
                      Sans échéance
                    </span>
                  )}

                  {task.isComplete && (
                    <span className="day-details__task-status">
                      {/* <Check size={15} /> */}
                      <span>Terminée</span>
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default DayDetails
