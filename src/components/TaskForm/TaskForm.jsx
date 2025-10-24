import { useState } from "react"
import { useTasks } from "../../contexts/TaskContext"

const TaskForm = () => {
  const [taskName, setTaskname] = useState("")
  const [showOptions, setShowoptions] = useState(false)
  const [category, setCategory] = useState("")
  const [newCat, setNewcat] = useState("")
  const [priority, setPriority] = useState(null)
  const [deadline, setDeadline] = useState("")

  const { categories, addTask, addCategory } = useTasks()

  // creer un id
  const generateId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  // soumettre tache
  const handleSubmit = (e) => {
    e.preventDefault()

    if (taskName.trim() === "") {
      alert("Entrez un nom")
      return
    }

    if (newCat.trim() !== "") {
      addCategory(newCat)
    }

    // nouvelle tache
    const newTask = {
      id: generateId(),
      name: taskName,
      initDate: new Date().toISOString(),
      deadline: deadline || null,
      priority: priority,
      category: newCat || category || null,
      isComplete: false
    }

    addTask(newTask)
    setTaskname("")
    setCategory("")
    setNewcat("")
    setPriority(null)
    setDeadline("")
    setShowoptions(false)
  }

  // voir options
  const toggleOptions = () => {
    setShowoptions(!showOptions)
  }

  return (
    <form className="taskform" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nouvelle tâche"
        value={taskName}
        onChange={(e) => setTaskname(e.target.value)}
      />
      <button
        className="taskform-optionsBtn"
        type="button"
        onClick={toggleOptions}
      >
        {showOptions ? "Masquer" : "Détails"}
      </button>

      {/* Options avancees */}
      {showOptions && (
        <div className="taskform-options">
          {/* categorie */}
          <div className="option-wrapper">
            <label>Catégorie</label>
            {categories.length > 0 && (
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">...</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            )}
            <input
              type="text"
              placeholder="Nouvelle catégorie"
              value={newCat}
              onChange={(e) => setNewcat(e.target.value)}
            />
          </div>
          {/* Priorite */}
          <div className="option-wrapper">
            <label>Priorité</label>
            <div className="prio-radios">
              <label className="radio-label">
                <input
                  type="radio"
                  name="priority"
                  value="high"
                  checked={priority === "high"}
                  onChange={(e) => setPriority(e.target.value)}
                />
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="priority"
                  value="medium"
                  checked={priority === "medium"}
                  onChange={(e) => setPriority(e.target.value)}
                />
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="priority"
                  value="low"
                  checked={priority === "low"}
                  onChange={(e) => setPriority(e.target.value)}
                />
              </label>
            </div>
          </div>
          {/* deadline */}
          <div className="option-wrapper">
            <label>Deadline :</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
        </div>
      )}

      <button className="taskform-addBtn" type="submit">
        Ajouter
      </button>
    </form>
  )
}

export default TaskForm
