
export const calulateStats = (tasks) => {
    const totalTasks = tasks.length 

    // tachees terminees
    const completedTasks = tasks.filter((task) => task.isComplete)
    const completedCount = completedTasks.length

    // taches en cours
    const activeTasks = tasks.filter((task) => !task.isComplete)
    const activeCount = activeTasks.length
    // pourcentage terminees
    const completionRate = totalTasks > 0 ? Math.round((completedCount/totalTasks) * 100) : 0
    // fini a temps
    const completedOnTime = completedTasks.filter((task) => {
        // ignore tache sans deadline et non finies
        if (!task.deadline || !task.completedDate) return false

        const deadline = new Date(task.deadline)
        const completedDate = new Date(task.completedDate)

        return completedDate === deadline
    })
    const onTimeCount = completedOnTime.length

    // terminees en retard
    const completedLate = completedTasks.filter((task) => {
        if (!task.deadline || !task.isComplete) return false

        const deadline = new Date(task.deadline)
        const completedDate = new Date(task.completedDate)

        return completedDate > deadline
    })
    const lateCount = completedLate.length

    // terminees en retard avec deadline
    const withDeadline = completedTasks.filter((task) => {task.deadline})
    const totalWithdeadline = withDeadline.length

    // pourcentage a temps
    const onTimeRate = totalWithdeadline > 0 ? Math.round((onTimeCount/totalTasks) * 100) : 0
    // pourcentage en retard
    const lateRate = totalWithdeadline > 0 ? Math.round((lateCount/totalTasks) * 100) : 0

    // trier les categories
    const categoriesStats = {}
    tasks.forEach(task => {
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
        onTimeCount,
        lateCount,
        onTimeRate,
        lateRate,
        totalWithdeadline,
        categories: categoriesArray
    }
}