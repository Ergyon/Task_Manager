import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useTasks } from "../../contexts/TaskContext"
import "./TaskTimer.css"

const TaskTimer = () => {
  const { taskId } = useParams()
  const { tasks } = useTasks()
  const navigate = useNavigate()

  const task = tasks.find((t) => t.id === taskId)

  // timer initial
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [totalSeconds, setTotalSeconds] = useState(0)

  // timer
  useEffect(() => {
    let interval = null

    if (isRunning && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            alert("Temps écoulé !")
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, totalSeconds])

  // mettre a jour l'affichage
  useEffect(() => {
    const h = Math.floor(totalSeconds / 3600)
    const m = Math.floor((totalSeconds % 3600) / 60)
    const s = totalSeconds % 60
    setHours(h)
    setMinutes(m)
    setSeconds(s)
  }, [totalSeconds])

  // lancer le timer
  const handleStart = () => {
    const total = hours * 3600 + minutes * 60 + seconds
    if (total > 0) {
      setTotalSeconds(total)
      setIsRunning(true)
    }
  }

  const handleCancel = () => {
    navigate("/")
  }

  // timer verouillage si pas de taskId
  if (!taskId || !task) {
    return (
      <div className="timer-locked">
        <div className="timer-locked__content">
          <h2>Timer verrouillé</h2>
          <h3>Vous n'avez lancé aucune tâche pour le moment.</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="timer">
      <h2 className="timer__title">{task.name}</h2>

      <div className="timer__display">
        <div className="timer__input-group">
          <input
            type="number"
            min="0"
            max="59"
            value={hours.toString().padStart(2, "0")}
            onChange={(e) =>
              !isRunning &&
              setHours(Math.max(0, Math.min(23, parseInt(e.target.value) || 0)))
            }
            disabled={isRunning}
            className="timer__input"
          />
          <span className="timer__separator">|</span>
          <input
            type="number"
            min="0"
            max="59"
            value={minutes.toString().padStart(2, "0")}
            onChange={(e) =>
              !isRunning &&
              setMinutes(
                Math.max(0, Math.min(59, parseInt(e.target.value) || 0))
              )
            }
            disabled={isRunning}
            className="timer__input"
          />
          <span className="timer__separator">|</span>
          <input
            type="number"
            min="0"
            max="59"
            value={seconds.toString().padStart(2, "0")}
            onChange={(e) =>
              !isRunning &&
              setSeconds(
                Math.max(0, Math.min(59, parseInt(e.target.value) || 0))
              )
            }
            disabled={isRunning}
            className="timer__input"
          />
        </div>
      </div>

      <div className="timer__actions">
        {!isRunning && totalSeconds === 0 && (
          <>
            <button
              className="timer__btn timer__btn--cancel"
              onClick={handleCancel}>
              Annuler
            </button>
            <button
              className="timer__btn timer__btn--confirm"
              onClick={handleStart}>
              {/* <Play size={20} /> */}
              Lancer
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default TaskTimer
