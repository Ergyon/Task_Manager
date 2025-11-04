// obtenir tache selon type de filtre
export const getModaltasks = (filter, stats) => {
    const taskLists = stats.taskLists

    switch (filter) {
        case 'total': return taskLists.all
        case 'active': return taskLists.active
        case 'completed': return taskLists.completed
        case 'early': return taskLists.early
        case 'ontime': return taskLists.ontime
        case 'late': return taskLists.late
        default: return []
    }
}

// obtenir titre de la modale
export const getModalTitle = (filter) => {
    const titles = {
        total: 'Total',
        active: 'En cours',
        completed: 'Terminées',
        early: 'En avance',
        ontime: 'À temps',
        late: 'En retard'
    }
    return titles[filter] || 'Tâches'
}