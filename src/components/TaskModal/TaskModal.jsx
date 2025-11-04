import { X } from "lucide-react"
import { useEffect, useRef } from "react"
import Task from "../Task/Task"
import "./TaskModal.css"

const TaskModal = ({ isOpen, onClose, tasks, title }) => {
  const modalRef = useRef(null)

  // fermer au clic en dehors
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target) && isOpen) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, onClose])

  // fermer avec echappe
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal" ref={modalRef}>
        <div className="modal__header">
          <h3 className="modal__title">{title}</h3>
          <button className="modal__close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal__body">
          {tasks.length === 0 ? (
            <p className="modal__empty">Aucune tâche</p>
          ) : (
            <div className="modal__tasks">
              {tasks.map((task) => (
                <Task key={task.id} task={task} variant="modal" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TaskModal
