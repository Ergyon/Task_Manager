import { Check, Minus, Tag } from "lucide-react"
import { useTasks } from "../../contexts/TaskContext"
import "./DayDetails.css"

const DayDetails = ({ selectedDate, onClose }) => {
  const { tasks } = useTasks()

  // format de date
  const formatSelectedDate = (dateString) => {
    const date = new Date(dateString.split("/").reverse().join("-"))
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long"
    }
    return date.toLocaleDateString("fr-FR", options)
  }

  // comparer 2 dates
  const isSameDay = (date1, date2) => {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    )
  }

  // recuperer taches du jour selectionne
  const getDayTasks = () => {
    const selectedDateObj = new Date(
      selectedDate.split("/").reverse().join("-")
    )

    return tasks.filter((task) => {
      // tache avec deadline ce jour
      if (task.deadline) {
        const taskDeadline = new Date(task.deadline)
        if (isSameDay(taskDeadline, selectedDateObj)) {
          // veriier si tache terminee ce jour
          if (task.isComplete && task.completedDate) {
            const completedDate = new Date(task.completeddate)
            return isSameDay(completedDate, selectedDate)
          }
          // afficher taches non terminees
          return true
        }
        return false
      }

      // afficher taches seulememt le jour ou elles ont ete terminees
      if (task.isComplete && task.completedDate) {
        const completedDate = new Date(task.completedDate)
        return isSameDay(completedDate, selectedDateObj)
      }

      // affiche seulement aujourd'hui si cree aujourd'hui et sans deadline
      if (!task.deadline && !task.isComplete) {
        const taskInitDate = new Date(task.initDate)
        return isSameDay(taskInitDate, selectedDateObj)
      }

      // sans deadline non terminees
      if (!task.deadline && !task.isComplete) {
        const taskInitDate = new Date(task.initDate)
        const today = new Date()
        const isCreatedToday = isSameDay(taskInitDate, today)

        // creee ajourd'hui => affiche seulement aujourd'hui
        if (!isCreatedToday) {
          return isSameDay(taskInitDate, selectedDateObj)
        }

        // creee avant aujourd'hui => afficher sur tous les jours
        return true
      }

      return false
    })
  }

  const dayTasks = getDayTasks()

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
        <h4 className="day-details__summary__title">Vos objectifs</h4>
        <div className="day-details__tasks">
          {dayTasks.map((task) => (
            <div
              key={task.id}
              className={`day-details__task ${
                task.isComplete ? "day-details__task--complete" : ""
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
                    <Check size={18} />
                    {/* <span>Terminée</span> */}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DayDetails
