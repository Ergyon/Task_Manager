import { useState } from "react"
import { useTasks } from "../contexts/TaskContext"

const HomePage = () => {
  const [taskName, setTaskname] = useState("")
  const { tasks, addTask } = useTasks()

  // creer un id
  const generateId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (taskName.trim() === "") {
      alert("Entrez un nom")
      return
    }

    const newTask = {
      id: generateId(),
      name: taskName,
      initDate: new Date().toISOString(),
      limitDate: null,
      importance: null,
      category: null,
      isComplete: false
    }

    addTask(newTask)
    setTaskname("")
  }

  return (
    <div className="home-container">
      <h2>Mes Tâches</h2>

      <form className="taskform" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nouvelle tâche"
          value={taskName}
          onChange={(e) => setTaskname(e.target.value)}
        />
        <button className="taskform-addBtn" type="submit">
          Ajouter
        </button>
      </form>

      <div className="tasklist-container">
        <h3>Listes des taches ({tasks.length})</h3>
        {tasks.map((task) => (
          <div key={task.id}>
            <p>{task.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default HomePage
