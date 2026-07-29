import './App.css'
import { MessagesContainer } from './components/MessagesContainer'
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider'
import { MainRouter } from './routers/MainRouter'

function App() {
  return (
    <TaskContextProvider>
        <MessagesContainer>
          <MainRouter/>
        </MessagesContainer>
    </TaskContextProvider>
  )
}

export default App
