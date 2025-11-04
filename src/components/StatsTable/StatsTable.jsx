import {
  Atom,
  CircleCheckBig,
  Clock,
  ClockFading,
  OctagonX,
  TableOfContents
} from "lucide-react"
import "./StatsTable.css"

const StatsTable = ({ stats, onCardClick }) => {
  return (
    <div className="stats-table">
      <h4 className="stats-table__title">Vue d'ensemble</h4>

      <div className="stats-table__grid">
        {/* stats generales */}
        <div className="stats-card" onClick={() => onCardClick("total")}>
          <TableOfContents size={18} />
          <div className="stats-card__content">
            <p className="stats-card__label">Total</p>
            <span className="stats-card__value">{stats.totalTasks}</span>
          </div>
        </div>
        <div
          className="stats-card stats-card--active"
          onClick={() => onCardClick("active")}>
          <ClockFading size={18} />
          <div className="stats-card__content">
            <p className="stats-card__label">En cours</p>
            <span className="stats-card__value">{stats.activeCount}</span>
          </div>
        </div>

        <div
          className="stats-card stats-card--completed"
          onClick={() => onCardClick("completed")}>
          <CircleCheckBig size={18} />
          <div className="stats-card__content">
            <p className="stats-card__label">Terminées</p>
            <span className="stats-card__value">{stats.completedCount}</span>
            <span className="stats-card__percentage">
              {stats.completionRate}%
            </span>
          </div>
        </div>

        {/* stats avec deadlines */}
        {stats.totalWithDeadline > 0 && (
          <>
            <div
              className="stats-card stats-card--early"
              onClick={() => onCardClick("early")}>
              <Atom size={18} />
              <div className="stats-card__content">
                <p className="stats-card__label stats-card__label--early">
                  En avance
                </p>
                <span className="stats-card__value">{stats.earlyCount}</span>
                <span className="stats-card__percentage stats-card__percentage--success">
                  {stats.earlyRate}%
                </span>
              </div>
            </div>

            <div
              className="stats-card stats-card--ontime"
              onClick={() => onCardClick("ontime")}>
              <Clock size={18} />
              <div className="stats-card__content">
                <p className="stats-card__label stats-card__label--ontime">
                  À temps
                </p>
                <span className="stats-card__value">{stats.onTimeCount}</span>
                <span className="stats-card__percentage">
                  {stats.onTimeRate}%
                </span>
              </div>
            </div>

            <div
              className="stats-card stats-card--late"
              onClick={() => onCardClick("late")}>
              <OctagonX size={18} />
              <div className="stats-card__content">
                <p className="stats-card__label stats-card__label--late">
                  En retard
                </p>
                <span className="stats-card__value">{stats.lateCount}</span>
                <span className="stats-card__percentage">
                  {stats.lateRate}%
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {stats.totalWithDeadline === 0 && stats.completedCount > 0 && (
        <p className="stats-table__note">
          Aucune tâche terminée n'avait de deadline définie
        </p>
      )}
    </div>
  )
}

export default StatsTable
