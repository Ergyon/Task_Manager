import { useEffect, useRef } from "react"
import "../../pages/Home/HomePage.css"
import "../Task/Task.css"

const LaunchTaskModal = ({ isOpen, onClose, onConfirm, taskName }) => {
  const modalRef = useRef(null)

  //   fermer la modale avec clic exterieur ou escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target) && isOpen) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, onClose])

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
    <div className="launch-modal" ref={modalRef}>
      <h4 className="launch-modal__title">Commencer et verrouiller</h4>
      <span className="launch-modal__task-name">{taskName} ?</span>

      <div className="launch-modal__actions">
        <button
          className="launch-modal__btn launch-modal__btn--confirm"
          onClick={onConfirm}>
          Je suis prêt
        </button>
        <button
          className="launch-modal__btn launch-modal__btn--cancel"
          onClick={onClose}>
          Je ne suis pas prêt
        </button>
      </div>
    </div>
  )
}

export default LaunchTaskModal
