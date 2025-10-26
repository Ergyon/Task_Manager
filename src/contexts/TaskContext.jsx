import { createContext, useContext, useEffect, useState } from "react"

const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
  // recuperer taches sauvegardees
  const getTasks = () => {
    const savedTasks = localStorage.getItem("tasks")
    return savedTasks ? JSON.parse(savedTasks) : []
  }

  // recuperer categories sauvegardees
  const getCategories = () => {
    const savedCategories = localStorage.getItem("categories")
    return savedCategories ? JSON.parse(savedCategories) : []
  }

  const [tasks, setTasks] = useState(getTasks)
  const [categories, setCategories] = useState(getCategories)

  // sauvegarde tache et categories
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories))
  }, [categories])

  // ajouter, supprimer tache
  const addTask = (newTask) => {
    setTasks([...tasks, newTask])
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // terminer tache
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          if (!task.isComplete) {
            return {
              ...task,
              isComplete: true,
              completedDate: new Date().toISOString()
            }
          } else {
            // de-terminer une tache
            const { completedDate, ...withoutCompleteDate } = task
            return {
              ...withoutCompleteDate,
              isComplete: false
            }
          }
        }
        return task
      })
    )
  }

  // creer categorie
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
