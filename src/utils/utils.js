// comparer 2 dates et verifier si c'est la meme 
 export const isSameDay = (date1, date2) => {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    )
}

// format date francais
export const formatSelectedDate = (datestring) => {
    const date = new Date(datestring.split("/").reverse().join("-"))
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }
    return date.toLocaleDateString("fr-FR", options)
}

// obtenir les taches d'un jour 
export const getTasksDay = (tasks, selectedDate) => {
    return tasks.filter((task) => {
        // affiche taches terminees seulement le jour ou elles ont ete terminees
        if (task.isComplete && task.completedDate) {
            const completedDate = new Date (task.completedDate)
            return isSameDay(completedDate, selectedDate)
        }

        // le jour de leur deadline
        if (task.deadline) {
            const taskDeadline = new Date(task.deadline)
            return isSameDay(taskDeadline, selectedDate)
        }

        // sans deadline et en cours
        if (!task.deadline && !task.isComplete) {
            const taskInitDate = new Date(task.initDate)
            const today = new Date()
            const isCreatedToday =  isSameDay(taskInitDate, today)

            // si creee aujourd'hui, affiche seulement aujourd'hui
            if (isCreatedToday) {
                return isSameDay(taskInitDate, selectedDate)
            }

            // affiche tous les jours si creee avant aujourd'hui
            return true
        }
        return false
    })
}

// lundi de la semaine actuelle
export const getMondayOfWeek = () => {
    const today = new Date()
    const currentDay = today.getDay()

    const daysToMonday = (currentDay === 0) ? 6 : currentDay - 1

    const monday = new Date(today)
    monday.setDate(today.getDate() - daysToMonday)

    monday.setHours(0, 0, 0, 0)

    return monday
}

// dimanche de la semaine actuelle
export const getSundayofWeek = () => {
    const today = new Date()
    const currentDay = today.getDay()

    const daysToSunday = (currentDay === 0) ? 0 : 7 - currentDay

    const sunday = new Date(today)
    sunday.setDate(today.getDate() + daysToSunday)

    sunday.setHours(23, 59, 59, 999)

    return sunday 
}

// verifie si dans la semaine actuelle
export const isThisWeek = (date) => {
    const taskDate = new Date(date)
    const monday = getMondayOfWeek()
    const sunday = getSundayofWeek()

    return taskDate >= monday && taskDate <= sunday
}

// verifie si dans le mois actuel
export const isThisMonth = (date)=> {
    const taskDate = new Date(date)
    const today = new Date()

    return (
        taskDate.getMonth() === today.getMonth() &&
        taskDate.getFullYear() === today.getFullYear()
    )
}

// vierifie si la date est aujourd'hui
export const isToday = (date) => {
    const taskDate = new Date(date)
    const today = new Date()
    return isSameDay(taskDate, today)
}