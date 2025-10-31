import "./StatsBarChart.css"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const StatsBarChart = ({ stats }) => {
  const isDark = document.body.classList.contains("dark")
  const data = [
    {
      name: "Global",
      active: stats.activeCount,
      completed: stats.completedCount
    }
  ]

  // taux de reussite si tache avec deadline
  if (stats.totalWithDeadline > 0) {
    data.push({
      name: "Terminées",
      early: stats.earlyCount,
      ontime: stats.onTimeCount,
      late: stats.lateCount
    })
  }

  return (
    <div className="stats-bar-chart">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 30, right: 45, left: -10, bottom: -30 }}
          barCategoryGap="15%">
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          <YAxis
            allowDecimals={false}
            style={{
              fontFamily: "Jost, system-ui, sans-serif",
              fontSize: "13px"
            }}
          />
          <Tooltip
            cursor={{
              fill: isDark ? "rgba(146, 146, 146, 0.05)" : "rgba(196, 192, 192, 0.2)"
            }}
            contentStyle={{
              fontFamily: "Inter",
              fontSize: "14px",
              fontWeight: "400",
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "8px 14px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1"
            }}
            labelStyle={{
              fontWeight: "400",
              color: "#1a1a1a",
              marginBottom: "12px",
              textAlign: "center"
            }}
            formatter={(value, name) => {
              const names = {
                active: "En cours",
                completed: "Terminées",
                early: "En avance",
                ontime: "À temps",
                late: "En retard"
              }
              return [value, names[name] || name]
            }}
          />

          <Bar dataKey="active" fill="#9e68d1ff" barSize={40} />
          <Bar dataKey="completed" fill="#31c090ff" barSize={40} />

          {stats.totalWithDeadline > 0 && (
            <>
              <Bar dataKey="early" fill="rgb(60, 149, 179)" barSize={40} />
              <Bar dataKey="ontime" fill="rgba(196, 164, 78, 1)" barSize={40} />
              <Bar dataKey="late" fill="rgba(199, 36, 36, 0.952)" barSize={40} />
            </>
          )}
        </BarChart>
      </ResponsiveContainer>

      {/* labels */}
      <div className="stats-bar-chart__legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: "#9e68d1ff" }}></span>
          <span className="legend-label">En cours</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: "#31c090f1" }}></span>
          <span className="legend-label">Terminées</span>
        </div>
        {stats.totalWithDeadline > 0 && (
          <>
            <div className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: "rgb(60, 149, 179)" }}></span>
              <span className="legend-label">En avance</span>
            </div>
            <div className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: "rgba(196, 164, 78, 1)" }}></span>
              <span className="legend-label">À temps</span>
            </div>
            <div className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: "rgba(199, 36, 36, 0.952)" }}></span>
              <span className="legend-label">En retard</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default StatsBarChart
