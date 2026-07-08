import './App.css'
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider'
import { Home } from './pages/Home'


function App() {
  return (
    <TaskContextProvider>
      <Home/>
    </TaskContextProvider>
  )
}

export default App
