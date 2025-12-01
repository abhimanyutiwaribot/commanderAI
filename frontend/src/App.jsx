import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./screens/dashboard"
import Tasks from "./screens/tasks"
import Home from "./screens/home"
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path= "/" element= {<Home/>} />
        <Route path="/dashboard" element= {<Dashboard />} />
        <Route path="/tasks" element= {<Tasks/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
