import { useState } from "react";
import { isThisMonth, isThisWeek, isToday } from "./utils";

// trier taches par temporalite : navigation
export const useTasksFilter = (tasks) => {
    const [activeFilter, setActiveFilter] = useState("Aujourd'hui")

    const getFilteredTasks = () => {
        const activeTasks = tasks.filter((task) => !task.isComplete)

        if (!activeFilter) {
            return activeTasks
        }

        switch (activeFilter) {
            case "Aujourd'hui":
                return activeTasks.filter((task) => {
                    if (task.deadline && isToday(task.deadline)) return true
                    if (!task.deadline) return true
                    return false
                })

            case "Cette semaine":
                return activeTasks.filter((task) => {
                    return task.deadline && isThisWeek(task.deadline)
                })
            
            case "Ce mois-ci":
                return activeTasks.filter((task) => {
                    return task.deadline && isThisMonth(task.deadline)
                })

            default: 
                return activeTasks
        }
    }

    return {
        activeFilter,
        setActiveFilter,
        filteredTasks: getFilteredTasks()
    }
}

// tirer taches par importance : affichage
export const sortTasks = (tasks, showCompleted = false) => {
    const priorityOrder = {
        high: 1,
        medium: 2,
        low: 3,
        null: 4
    }
    return [...tasks].sort((a,b) => {
        if (showCompleted) {
            if (a.isComplete !== b.isComplete) {
                return a.isComplete ? 1 : -1
            }
        }

        const priorityA = priorityOrder[a.priority] || priorityOrder.null
        const priorityB = priorityOrder[b.priority] || priorityOrder.null

        return priorityA - priorityB
    })
}