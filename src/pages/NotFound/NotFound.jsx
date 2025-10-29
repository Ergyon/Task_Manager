import { Link } from "react-router-dom"
import "./NotFound.css"

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h2 className="notfound-title">404</h2>
      <h3 className="notfound-subtitle">Page introuvable</h3>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  )
}

export default NotFound
