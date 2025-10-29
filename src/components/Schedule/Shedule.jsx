import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTasks } from "../../contexts/TaskContext.jsx"
import { getTasksDay, isSameDay } from "../../utils/utils.js"
import "./Shedule.css"

const Schedule = ({ currentDate, setCurrentdate, onDayClick, selectedDay }) => {
  const { tasks } = useTasks()

  const goPreviousMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() - 1)
    setCurrentdate(newDate)
  }

  const goNextMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + 1)
    setCurrentdate(newDate)
  }

  const month = currentDate.toLocaleDateString("fr-FR", {
    month: "long"
  })

  const year = currentDate.toLocaleDateString("fr-FR", {
    year: "numeric"
  })

  // generer les jours du calendrier
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    // premier et dernier jour du mois, de la semaine, jours par mois
    const fisrtDayMonth = new Date(year, month, 1)
    const lastDayMonth = new Date(year, month + 1, 0)
    const firstDayWeekday = fisrtDayMonth.getDay()
    const monthDays = lastDayMonth.getDate()
    const days = []

    // derniers jours du mois precedent a afficher (grises)
    const prevMonthDays = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1
    const prevMonthWeek = new Date(year, month, 0).getDate()

    for (let i = prevMonthDays; i > 0; i--) {
      const day = prevMonthWeek - i + 1
      const date = new Date(year, month - 1, day)
      days.push({
        day,
        date,
        isCurrentMonth: false,
        isToday: false
      })
    }

    // jours du mois actuel
    const today = new Date()
    for (let day = 1; day <= monthDays; day++) {
      const date = new Date(year, month, day)
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()

      days.push({
        day,
        date,
        isCurrentMonth: true,
        isToday
      })
    }

    // nombre de jours a afficher par mois
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day)
      days.push({
        day,
        date,
        isCurrentMonth: false,
        isToday: false
      })
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  return (
    <div className="calendar">
      {/* header */}
      <div className="calendar__header">
        <button className="calendar__navBtn" onClick={goPreviousMonth}>
          <ChevronLeft size={24} />
        </button>

        <h2 className="calendar__month">{month}</h2>
        <h3 className="calendar__year">{year}</h3>

        <button className="calendar__navBtn" onClick={goNextMonth}>
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="calendar__body">
        {/* en-tetes jours de la semaine */}
        <div className="calendar__weekdays">
          <div className="calendar__weekdays--day">Lun</div>
          <div className="calendar__weekdays--day">Mar</div>
          <div className="calendar__weekdays--day">Mer</div>
          <div className="calendar__weekdays--day">Jeu</div>
          <div className="calendar__weekdays--day">Ven</div>
          <div className="calendar__weekdays--day">Sam</div>
          <div className="calendar__weekdays--day">Dim</div>
        </div>

        {/* grille des jours */}
        <div className="calendar__days">
          {calendarDays.map((dayInfo, index) => {
            const dayTasks = getTasksDay(tasks, dayInfo.date)

            // verifie si c'est le jour selectionne
            const isSelected =
              selectedDay &&
              isSameDay(
                dayInfo.date,
                new Date(selectedDay.split("/").reverse().join("-"))
              )

            return (
              <div
                key={index}
                className={`calendar__day ${
                  !dayInfo.isCurrentMonth ? "calendar__day--other-month" : ""
                } ${dayInfo.isToday ? "calendar__day--today" : ""} ${
                  isSelected ? "calendar__day--selected" : ""
                }`}
                onClick={() =>
                  onDayClick(dayInfo.date.toLocaleDateString("fr-FR"))
                }
              >
                <span className="calendar__day-number">{dayInfo.day}</span>

                {dayTasks.length > 0 && (
                  <div className="calendar__day-meta">
                    {/* infos taches sur jour du calendrier */}
                    {dayTasks
                      .filter((task) => task.priority)
                      .slice(0, 3)
                      .map((task, taskIndex) => (
                        <span
                          key={taskIndex}
                          className={`calendar__day-badge calendar__day-badge--${task.priority}`}
                          title={task.name}
                        ></span>
                      ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Schedule
