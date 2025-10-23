import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Header from "./components/Header/Header.jsx"
import { ThemeProvider } from "./contexts/ThemeContext"
import Agenda from "./pages/Agenda.jsx"
import HomePage from "./pages/HomePage.jsx"
import Stats from "./pages/Stats.jsx"

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
export default App
