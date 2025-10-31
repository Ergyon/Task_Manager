import { isThisMonth, isThisWeek, isToday } from "./utils"

// filtre les taches dans une temporalite (aujourd'hui, cette semaine...) 
export const filteredTasksStats = (tasks, filter) => {
    if (!filter || filter === "Toutes") {
        return tasks
    }

    switch (filter) {
        case "Aujourd'hui":
            return tasks.filter((task) => {
                if (!task.deadline) return true
                return isToday(task.deadline)
            })

        case "Cette semaine":
            return tasks.filter((task) => {
                if (!task.deadline) return true
                return isThisWeek(task.deadline)
            })

        case "Ce mois-ci":
            return tasks.filter((task) => {
                if (!task.deadline) return true
                return isThisMonth(task.deadline)
            })    

        case "Cette année":
            return tasks.filter((task) => {
                if (!task.deadline) return true
                const taskDate = new Date(task.deadline)
                const currentYear = new Date().getFullYear()
                return taskDate.getFullYear() === currentYear
            })    

            default: return tasks
    }
}

// calcul des stats
export const calculateStats = (tasks) => {
    const totalTasks = tasks.length 


    // tachees terminees
    const completedTasks = tasks.filter((task) => task.isComplete)
    const completedCount = completedTasks.length

    // taches en cours
    const activeTasks = tasks.filter((task) => !task.isComplete)
    const activeCount = activeTasks.length
    // pourcentage terminees
    const completionRate = totalTasks > 0 ? Math.round((completedCount/totalTasks) * 100) : 0

    // terminees avec deadline 
    const completedDeadline = completedTasks.filter((task) => task.deadline && task.completedDate)
    const totalWithDeadline =  completedDeadline.length

    // terminees en avance
    const completedEarly = completedDeadline.filter((task) => {
        const deadline = new Date(task.deadline)
        const completedDate = new Date(task.completedDate)
        // reinitialise les heures pour comparer seulement les dates
        deadline.setHours(0, 0, 0, 0)
        completedDate.setHours(0, 0, 0, 0)
        // au moins un jour en avance
        const daysDiff = Math.floor((deadline - completedDate) / (1000 * 60 * 60 * 24))
        return daysDiff >= 1
    })
    const earlyCount = completedEarly.length

    // fini a temps
    const completedOnTime = completedDeadline.filter((task) => {
        const deadline = new Date(task.deadline)
        const completedDate = new Date(task.completedDate)

        deadline.setHours(0, 0, 0, 0)
        completedDate.setHours(0, 0, 0, 0)

        const daysDiff = Math.floor((deadline - completedDate) / (1000 * 60 * 60 * 24))

        return completedDate <= deadline && daysDiff < 1
    })
    const onTimeCount = completedOnTime.length

    // terminees en retard
    const completedLate = completedDeadline.filter((task) => {
        const deadline = new Date(task.deadline)
        const completedDate = new Date(task.completedDate)

        deadline.setHours(0, 0, 0, 0)
        completedDate.setHours(0, 0, 0, 0)

        return completedDate > deadline
    })
    const lateCount = completedLate.length

    // pourcentage en avance
    const earlyRate = totalWithDeadline > 0 ? Math.floor((earlyCount/totalWithDeadline) * 100) : 0
    // pourcentage a temps
    const onTimeRate = totalWithDeadline > 0 ? Math.round((onTimeCount/totalWithDeadline) * 100) : 0
    // pourcentage en retard
    const lateRate = totalWithDeadline > 0 ? Math.round((lateCount/totalWithDeadline) * 100) : 0

    // trier les categories
    const categoriesStats = {}
    completedTasks.forEach(task => {
        const category = task.category || "Sans catégorie"
        if (!categoriesStats[category]) {
            categoriesStats[category] = 0
        }
        categoriesStats[category]++
    })

    const categoriesArray = Object.entries(categoriesStats).map(([name, count]) => ({
        name, 
        count,
        percentage: totalTasks > 0 ? Math.round((count/ totalTasks) * 100) : 0
    }))

    return {
        totalTasks,
        activeCount,
        completedCount,
        completionRate,
        earlyCount,
        earlyRate,
        onTimeCount,
        onTimeRate,
        lateCount,
        lateRate,
        totalWithDeadline,
        categories: categoriesArray
    }
}