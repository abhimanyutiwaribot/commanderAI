import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./screens/dashboard"
import Tasks from "./screens/tasks"
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path= "/" element= {<Dashboard/>} />
        <Route path="/tasks" element= {<Tasks/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
