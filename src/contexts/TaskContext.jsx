import { createContext, useContext, useState } from "react"

const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])

  const addTask = (newTask) => {
    setTasks([...tasks, newTask])
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) => {
        // console.log(`Tache terminee ${task.id} -- ${task.name}`)
        return task.id === id ? { ...task, isComplete: !task.isComplete } : task
      })
    )
  }

  const addCategory = (newCat) => {
    if (newCat.trim() !== "" && !categories.includes(newCat)) {
      setCategories([...categories, newCat])
    } else if (categories.includes(newCat)) {
      alert("Categorie deja existante")
    }
  }

  const value = {
    tasks,
    categories,
    addTask,
    deleteTask,
    toggleComplete,
    addCategory
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export const useTasks = () => {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error("UseTasks n'est pas dans TaskProvider")
  }

  return context
}
