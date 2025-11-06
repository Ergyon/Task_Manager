import { useState } from "react"
import DayDetails from "../../components/DayDetails/DayDetails"
import Schedule from "../../components/Schedule/Shedule"
import { useTasks } from "../../contexts/TaskContext"
import "./Agenda.css"

const Agenda = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(null)
  const { tasks } = useTasks()

  const hasCompleteTask = tasks.some(
    (task) => task.name && task.deadline && task.category && task.priority
  )

  return (
    <div className="main-container">
      {hasCompleteTask ? (
        <>
          <Schedule
            currentDate={currentDate}
            setCurrentdate={setCurrentDate}
            onDayClick={setSelectedDay}
            selectedDay={selectedDay}
          />

          {selectedDay && (
            <div className="resume">
              <DayDetails
                selectedDate={selectedDay}
                onClose={() => setSelectedDay(null)}
              />
            </div>
          )}
        </>
      ) : (
        <div className="agenda-locked">
          <div className="agenda-locked__content">
            <h2>Agenda verrouillé</h2>
            <h3>Créez une tâche complète pour accéder à l'agenda.</h3>
          </div>
        </div>
      )}
    </div>
  )
}

export default Agenda
