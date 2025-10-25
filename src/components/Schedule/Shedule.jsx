import { ChevronLeft, ChevronRight } from "lucide-react"
import "./Shedule.css"

const Schedule = ({ currentDate, setCurrentdate, onDayClick }) => {
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

  return (
    <div className="calendar">
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

      <div className="calendar__body"></div>
    </div>
  )
}

export default Schedule
