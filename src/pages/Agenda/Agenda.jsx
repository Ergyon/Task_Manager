import { Minus } from "lucide-react"
import { useState } from "react"
import Schedule from "../../components/Schedule/Shedule"
import "./Agenda.css"

const Agenda = () => {
  const [currentDate, setCurrentdate] = useState(new Date())

  const [selectedDay, setSelectedDay] = useState("28 / 10 / 2025")

  return (
    <div className="main-container">
      <Schedule
        currentDate={currentDate}
        setCurrentdate={setCurrentdate}
        onDayClick={setSelectedDay}
      />

      {selectedDay && (
        <div className="resume">
          <div className="resume__header">
            <h3>Détails du jour</h3>
            <button
              className="resume__close"
              onClick={() => setSelectedDay(null)}
            >
              <Minus size={20} />
            </button>
          </div>
          <h4 className="resume__day">{selectedDay}</h4>
        </div>
      )}
    </div>
  )
}

export default Agenda
