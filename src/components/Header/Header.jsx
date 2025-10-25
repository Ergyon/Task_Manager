import { Lightbulb } from "lucide-react"
import { Link } from "react-router-dom"
import { useTheme } from "../../contexts/ThemeContext"
import "./Header.css"

const Header = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className={theme}>
      <h1 className="header__title">Task Tracker</h1>
      <nav className="header__nav">
        <Link to="/">Tâches</Link>
        <Link to="/agenda">Agenda</Link>
        <Link to="/stats">Statistiques</Link>
      </nav>
      <button className="header__switchBtn" onClick={toggleTheme}>
        <Lightbulb size={18} />
      </button>
    </header>
  )
}

export default Header
