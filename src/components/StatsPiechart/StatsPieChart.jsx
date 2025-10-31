import { useEffect, useState } from "react"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import "./StatsPieChart.css"

const StatsPieChart = ({ stats }) => {
  const COLORS = [
    "#2b6bd1ff",
    "#d3a21de8",
    "#11ca83ff",
    "#8b5cf6",
    "#d43886ff",
    "#06b6d4",
    "#c7c42bff",
    "#f97316"
  ]

  const [radius, setRadius] = useState(160)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setRadius(80)
      } else if (width < 1024) {
        setRadius(110)
      } else {
        setRadius(160)
      }
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (stats.categories.length === 0) {
    return <div className="stats-pie-empty">Aucune catégorie pour le moment</div>
  }

  const data = stats.categories

  return (
    <div className="stats-pie">
      <h4 className="stats-pie__title">Domaines où vous êtes le plus productif</h4>

      <ResponsiveContainer width="100%" height={550}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={{
              position: "inside",
              style: {
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "14px"
              }
            }}
            outerRadius={radius}
            fill="#8884d8"
            dataKey="count">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "13px",
              fontWeight: "400",
              backgroundColor: "#f7f7f7ff",
              color: "#1a1a1a",
              border: "1px solid grey",
              borderRadius: "10px",
              padding: "6px 10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
            formatter={(value, name, props) => [
              `${value} tâches (${props.payload.percentage}%)`,
              props.payload.name
            ]}
          />
          <Legend
            wrapperStyle={{
              fontFamily: "Jost, system-ui, sans-serif",
              fontSize: "18px",
              fontWeight: "300",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              gap: "8px 24px",
              flexWrap: "wrap"
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatsPieChart
