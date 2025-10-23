import { createContext, useContext, useState } from "react"

const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])

  const addTask = (newTask) => {
    setTasks([...tasks, newTask])
  }

  const deleteTask = (id) => {
      setTasks(tasks.filter((task) => task.id !== id))
  }

  const finishTask = (id) => {
    setTasks(
        tasks.map((task) => {
            task.id === id ? {...task, isComplete: !task.isComplete} : task
        })
    )
  }

  const value = {
    tasks,
    addTask,
    deleteTask,
    finishTask
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export const useTasks() => {
    const context = useContext(TaskContext)

    if (!context) {
        throw new Error("UseTasks n'est pas dans TaskProvider")
    }

    return context
}