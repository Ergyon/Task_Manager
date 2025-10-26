import { useState } from "react"
import DayDetails from "../../components/DayDetails/DayDetails"
import Schedule from "../../components/Schedule/Shedule"
import "./Agenda.css"

const Agenda = () => {
  const [currentDate, setCurrentdate] = useState(new Date())

  const [selectedDay, setSelectedDay] = useState(null)

  return (
    <div className="main-container">
      <Schedule
        currentDate={currentDate}
        setCurrentdate={setCurrentdate}
        onDayClick={setSelectedDay}
      />

      {selectedDay && (
        <div className="resume">
          <DayDetails
            selectedDate={selectedDay}
            onClose={() => setSelectedDay(null)}
          />
        </div>
      )}
    </div>
  )
}

export default Agenda
