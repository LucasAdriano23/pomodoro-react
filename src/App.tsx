import './App.css'
import { MessagesContainer } from './components/MessagesContainer';
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider'
import { Home } from './pages/Home'

function App() {
  return (
    <TaskContextProvider>
      <MessagesContainer>
        <Home/>
      </MessagesContainer>
    </TaskContextProvider>
  )
}

export default App
