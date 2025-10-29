import { useState } from "react";
import { isThisMonth, isThisWeek, isToday } from "./utils";

export const useTasksFilter = (tasks) => {
    const [activeFilter, setActiveFilter] = useState(null)

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