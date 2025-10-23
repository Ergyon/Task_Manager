import { BrowserRouter, Route, Routes } from "react-router-dom"

import Header from "./components/Header/Header.jsx"
import { TaskProvider } from "./contexts/TaskContext.jsx"
import { ThemeProvider, useTheme } from "./contexts/ThemeContext"
import Agenda from "./pages/Agenda.jsx"
import HomePage from "./pages/HomePage.jsx"
import Stats from "./pages/Stats.jsx"

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <TaskProvider>
          <AppContent />
        </TaskProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

const AppContent = () => {
  const { theme } = useTheme()

  return (
    <div className={theme}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/agenda" element={<Agenda />}></Route>
        <Route path="/stats" element={<Stats />}></Route>
      </Routes>
    </div>
  )
}

export default App
